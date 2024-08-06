import { WidgetProp, WidgetPropValueType } from '@prisma/client';
import * as dotenv from 'dotenv';
import { UserService } from '../src/modules/user/user.service';
import { PrismaService } from '../src/prisma/prisma.service';
import {
  antdMiniWidgetsData,
  antdMobileWidgetsData,
  antdPcWidgetsData,
} from './seedData';
import { WidgetDataRecord, WidgetPropRecord } from './types';
import { isEqual } from 'lodash';

dotenv.config();

const prismaService = new PrismaService();
const userService = new UserService(prismaService);

const widgets = [
  ...antdPcWidgetsData,
  ...antdMobileWidgetsData,
  ...antdMiniWidgetsData,
].map((widget) => {
  return {
    name: widget.name,
    widgetLib: widget.widgetLib,
    slots: widget.slots || ['children'],
    platforms: widget.platforms,
    category: widget.category,
    display: widget.display,
    props: widget.defaultProps
      ? Object.entries(widget.defaultProps).map(([key, value]) => ({
          key,
          value,
        }))
      : [], // 转换 props
  } satisfies WidgetDataRecord;
});

const defaultPassword = '123456a.'; // 默认密码

async function main() {
  // 检查并创建 root 用户
  let rootUser = await prismaService.user.findUnique({
    where: { email: 'root@example.com' },
  });

  if (!rootUser) {
    const newRootUser = {
      name: 'root',
      email: 'root@example.com',
      password: process.env.ROOT_PASSWORD || defaultPassword, // 从环境变量读取密码
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
      password: defaultPassword, // 空密码
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
      include: {
        props: true,
      },
    });

    const getWidgetPropValue = (widget: WidgetProp) => {
      if (widget.valueType === WidgetPropValueType.Boolean) {
        return widget.boolValue;
      }
      if (widget.valueType === WidgetPropValueType.Number) {
        return widget.numberValue;
      }
      if (widget.valueType === WidgetPropValueType.String) {
        return widget.stringValue;
      }
      if (widget.valueType === WidgetPropValueType.Json) {
        return widget.jsonValue;
      }
      throw new Error(`Unsupported value type: ${widget.valueType}`);
    };

    const getValueType = (prop: WidgetPropRecord) => {
      if (typeof prop.value === 'number') {
        return WidgetPropValueType.Number;
      }
      if (typeof prop.value === 'boolean') {
        return WidgetPropValueType.Boolean;
      }
      if (typeof prop.value === 'string') {
        return WidgetPropValueType.String;
      }
      if (typeof prop.value === 'object') {
        return WidgetPropValueType.Json;
      }
      throw new Error(`Unsupported value type: ${typeof prop.value}`);
    };

    const getValueFieldName = (prop: WidgetPropRecord) => {
      if (typeof prop.value === 'number') {
        return 'numberValue';
      } else if (typeof prop.value === 'boolean') {
        return 'boolValue';
      } else if (typeof prop.value === 'string') {
        return 'stringValue';
      } else if (typeof prop.value === 'object') {
        return 'jsonValue';
      } else {
        throw new Error('Unsupported value type');
      }
    };

    if (widget) {
      // 筛选出需要更新的属性
      const propsToUpdate = widget.props.filter((prop) => {
        const existingProp = widgetData.props.find((p) => p.key === prop.key);
        return (
          existingProp && !isEqual(getWidgetPropValue(prop), existingProp.value)
        );
      });

      // 检查是否需要更新
      const shouldUpdate =
        widget.platforms.join(',') !== widgetData.platforms.join(',') ||
        widget.category !== widgetData.category ||
        widget.widgetLibId !== widgetLib.id ||
        widget.props.length !== widgetData.props.length ||
        propsToUpdate.length > 0;

      if (shouldUpdate) {
        // 创建一个 Set 存储 widgetData.props 中的 key
        const widgetDataPropKeys = new Set(
          widgetData.props.map((prop) => prop.key),
        );
        // 创建一个 Set 存储 widget.props 中的 key
        const widgetPropKeys = new Set(widget.props.map((prop) => prop.key));

        // 找出在 widget.props 中但不在 widgetData.props 中的项
        const propsToDelete = widget.props.filter(
          (prop) => !widgetDataPropKeys.has(prop.key),
        );
        // 找出在 widgetData.props 中但不在 widget.props 中的项
        const propsToAdd = widgetData.props.filter(
          (prop) => !widgetPropKeys.has(prop.key),
        );

        await prismaService.widget.update({
          where: { id: widget.id },
          data: {
            platforms: widgetData.platforms,
            category: widgetData.category,
            widgetLib: {
              connect: { id: widgetLib.id },
            },
            props: {
              createMany: {
                data: propsToAdd.map((prop) => ({
                  ownerId: rootUser.id,
                  key: prop.key,
                  valueType: getValueType(prop),
                  [getValueFieldName(prop)]: prop.value,
                })),
              },
              deleteMany: propsToDelete.map((prop) => ({ id: prop.id })),
              updateMany: propsToUpdate.map((prop) => {
                const existingProp = widgetData.props.find(
                  (p) => p.key === prop.key,
                );

                if (!existingProp) {
                  throw new Error(`Missing prop: ${prop.key}`);
                }

                return {
                  where: { id: prop.id },
                  data: {
                    valueType: getValueType(existingProp),
                    [getValueFieldName(existingProp)]: existingProp.value,
                  },
                };
              }),
            },
          },
        });
      }
    } else {
      widget = await prismaService.widget.create({
        data: {
          display: widgetData.display,
          name: widgetData.name,
          platforms: widgetData.platforms,
          category: widgetData.category,
          owner: {
            connect: { id: rootUser.id }, // 使用 root 用户的 ID
          },
          widgetLib: {
            connect: { id: widgetLib.id },
          },
          props: {
            createMany: {
              data: widgetData.props.map((prop) => ({
                ownerId: rootUser.id,
                key: prop.key,
                valueType: getValueType(prop),
                [getValueFieldName(prop)]: prop.value,
              })),
            },
          },
        },
        include: {
          props: true,
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
