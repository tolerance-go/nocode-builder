import { WidgetPlatformType } from '@prisma/client';
import * as dotenv from 'dotenv';
import { UserService } from 'src/modules/user/user.service';
import { PrismaService } from 'src/prisma/prisma.service';

dotenv.config();

const prismaService = new PrismaService();
const userService = new UserService(prismaService);

const widgets = [
  {
    name: 'HeaderWidget1',
    component: 'Header',
    widgetLib: 'HeaderLib',
    slots: ['HeaderSlot1', 'HeaderSlot2'],
    platforms: [WidgetPlatformType.PcWeb, WidgetPlatformType.MobileWeb],
  },
  {
    name: 'HeaderWidget2',
    component: 'Header',
    widgetLib: 'HeaderLib',
    slots: ['HeaderSlot1', 'HeaderSlot3'],
    platforms: [WidgetPlatformType.PcWeb, WidgetPlatformType.MobileWeb],
  },
  {
    name: 'FooterWidget1',
    component: 'Footer',
    widgetLib: 'FooterLib',
    slots: ['FooterSlot1', 'FooterSlot2'],
    platforms: [WidgetPlatformType.PcWeb, WidgetPlatformType.MobileWeb],
  },
];

async function main() {
  await prismaService.onModuleInit(); // 确保 PrismaService 已连接

  // 创建 root 用户
  const rootUser = {
    name: 'root',
    email: 'root@example.com',
    password: process.env.ROOT_PASSWORD || '123456a.', // 从环境变量读取密码
    isAdmin: true,
  };

  let rootUserId: number;

  try {
    const createdRootUser = await userService.createUserWithPassword(rootUser);
    rootUserId = createdRootUser.id;
    console.log('Root user created successfully');
  } catch (error) {
    console.error('Error creating root user:', error);
    process.exit(1);
  }

  const componentMap = new Map<string, any>();

  for (const widgetData of widgets) {
    let component = componentMap.get(widgetData.component);

    if (!component) {
      // 创建组件
      component = await prismaService.component.create({
        data: {
          name: widgetData.component,
          platforms: widgetData.platforms,
          owner: {
            connect: { id: rootUserId }, // 使用 root 用户的 ID
          },
        },
      });
      componentMap.set(widgetData.component, component);
    }

    // 创建 WidgetLib，如果不存在
    let widgetLib = await prismaService.widgetLib.findUnique({
      where: { name: widgetData.widgetLib },
    });

    if (!widgetLib) {
      widgetLib = await prismaService.widgetLib.create({
        data: {
          name: widgetData.widgetLib,
          owner: {
            connect: { id: rootUserId }, // 使用 root 用户的 ID
          },
        },
      });
    }

    // 创建 Widget
    const widget = await prismaService.widget.create({
      data: {
        name: widgetData.name,
        component: {
          connect: { id: component.id },
        },
        owner: {
          connect: { id: rootUserId }, // 使用 root 用户的 ID
        },
        widgetLib: {
          connect: { id: widgetLib.id },
        },
      },
    });

    for (const slotName of widgetData.slots) {
      let widgetSlot = await prismaService.widgetSlot.findUnique({
        where: { name: slotName },
      });

      if (!widgetSlot) {
        widgetSlot = await prismaService.widgetSlot.create({
          data: {
            name: slotName,
            owner: {
              connect: { id: rootUserId }, // 使用 root 用户的 ID
            },
          },
        });
      }

      // 创建 WidgetSlotAssignment
      await prismaService.widgetSlotAssignment.create({
        data: {
          widget: {
            connect: { id: widget.id },
          },
          slot: {
            connect: { id: widgetSlot.id },
          },
          owner: {
            connect: { id: rootUserId }, // 使用 root 用户的 ID
          },
        },
      });
    }
  }

  await prismaService.onModuleDestroy(); // 断开 PrismaService 连接

  console.log('Seed data created successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prismaService.$disconnect();
  });
