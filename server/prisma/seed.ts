import * as dotenv from 'dotenv';
import { UserService } from '../src/modules/user/user.service';
import { PrismaService } from '../src/prisma/prisma.service';
import { antdMobileWidgetsData, antdPcWidgetsData } from './seedData';

dotenv.config();

const prismaService = new PrismaService();
const userService = new UserService(prismaService);

const widgets = [...antdPcWidgetsData, ...antdMobileWidgetsData].map(
  (widget) => {
    return {
      name: widget.name,
      widgetLib: widget.widgetLib,
      slots: widget.slots || ['children'],
      platforms: widget.platforms,
      category: widget.category,
    };
  },
);

async function main() {
  // 检查并创建 root 用户
  let rootUser = await prismaService.user.findUnique({
    where: { email: 'root@example.com' },
  });

  if (!rootUser) {
    const newRootUser = {
      name: 'root',
      email: 'root@example.com',
      password: process.env.ROOT_PASSWORD || '123456a.', // 从环境变量读取密码
      isAdmin: true,
    };

    try {
      const createdRootUser =
        await userService.createUserWithPassword(newRootUser);
      rootUser = createdRootUser;
      console.log('Root user created successfully');
    } catch (error) {
      console.error('Error creating root user:', error);
      process.exit(1);
    }
  } else {
    console.log('Root user already exists');
  }

  // 检查并创建测试用户
  const testUser = await prismaService.user.findUnique({
    where: { email: 'test@example.com' },
  });

  if (!testUser) {
    const newTestUser = {
      name: 'test',
      email: 'test@example.com',
      password: '', // 空密码
      isAdmin: false,
    };

    try {
      await userService.createUserWithPassword(newTestUser);
      console.log('Test user created successfully');
    } catch (error) {
      console.error('Error creating test user:', error);
      process.exit(1);
    }
  } else {
    console.log('Test user already exists');
  }

  for (const widgetData of widgets) {
    // 创建 WidgetLib，如果不存在
    let widgetLib = await prismaService.widgetLib.findUnique({
      where: { name: widgetData.widgetLib },
    });

    if (!widgetLib) {
      widgetLib = await prismaService.widgetLib.create({
        data: {
          name: widgetData.widgetLib,
          owner: {
            connect: { id: rootUser.id }, // 使用 root 用户的 ID
          },
        },
      });
    }

    // 创建或更新 Widget
    let widget = await prismaService.widget.findFirst({
      where: {
        name: widgetData.name,
        widgetLibId: widgetLib.id,
      },
    });

    if (widget) {
      // 检查是否需要更新
      const shouldUpdate =
        widget.platforms.join(',') !== widgetData.platforms.join(',') ||
        widget.category !== widgetData.category ||
        widget.widgetLibId !== widgetLib.id;

      if (shouldUpdate) {
        await prismaService.widget.update({
          where: { id: widget.id },
          data: {
            platforms: widgetData.platforms,
            category: widgetData.category,
            widgetLib: {
              connect: { id: widgetLib.id },
            },
          },
        });
      }
    } else {
      widget = await prismaService.widget.create({
        data: {
          name: widgetData.name,
          platforms: widgetData.platforms,
          category: widgetData.category,
          owner: {
            connect: { id: rootUser.id }, // 使用 root 用户的 ID
          },
          widgetLib: {
            connect: { id: widgetLib.id },
          },
        },
      });
    }

    for (const slotName of widgetData.slots) {
      let widgetSlot = await prismaService.widgetSlot.findUnique({
        where: { name: slotName },
      });

      if (!widgetSlot) {
        widgetSlot = await prismaService.widgetSlot.create({
          data: {
            name: slotName,
            owner: {
              connect: { id: rootUser.id }, // 使用 root 用户的 ID
            },
          },
        });
      }

      // 创建或更新 WidgetSlotAssignment
      const existingAssignment =
        await prismaService.widgetSlotAssignment.findUnique({
          where: {
            widgetId_slotId: {
              widgetId: widget.id,
              slotId: widgetSlot.id,
            },
          },
        });

      if (!existingAssignment) {
        await prismaService.widgetSlotAssignment.create({
          data: {
            widget: {
              connect: { id: widget.id },
            },
            slot: {
              connect: { id: widgetSlot.id },
            },
            owner: {
              connect: { id: rootUser.id }, // 使用 root 用户的 ID
            },
          },
        });
      }
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prismaService.$disconnect();
  });
