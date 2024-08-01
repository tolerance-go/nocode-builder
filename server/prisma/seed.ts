import { WidgetPlatformType, WidgetCategory } from '@prisma/client';
import * as dotenv from 'dotenv';
import { UserService } from 'src/modules/user/user.service';
import { PrismaService } from 'src/prisma/prisma.service';

dotenv.config();

const prismaService = new PrismaService();
const userService = new UserService(prismaService);

const widgetsData = [
  { name: '按钮', name_en: 'Button', category: WidgetCategory.General },
  {
    name: '悬浮按钮',
    name_en: 'FloatButton',
    category: WidgetCategory.General,
  },
  { name: '图标', name_en: 'Icon', category: WidgetCategory.General },
  { name: '排版', name_en: 'Typography', category: WidgetCategory.General },
  { name: '分割线', name_en: 'Divider', category: WidgetCategory.Layout },
  { name: '弹性布局', name_en: 'Flex', category: WidgetCategory.Layout },
  { name: '栅格', name_en: 'Grid', category: WidgetCategory.Layout },
  { name: '布局', name_en: 'Layout', category: WidgetCategory.Layout },
  { name: '间距', name_en: 'Space', category: WidgetCategory.Layout },
  { name: '锚点', name_en: 'Anchor', category: WidgetCategory.Navigation },
  {
    name: '面包屑',
    name_en: 'Breadcrumb',
    category: WidgetCategory.Navigation,
  },
  {
    name: '下拉菜单',
    name_en: 'Dropdown',
    category: WidgetCategory.Navigation,
  },
  { name: '导航菜单', name_en: 'Menu', category: WidgetCategory.Navigation },
  { name: '分页', name_en: 'Pagination', category: WidgetCategory.Navigation },
  { name: '步骤条', name_en: 'Steps', category: WidgetCategory.Navigation },
  {
    name: '自动完成',
    name_en: 'AutoComplete',
    category: WidgetCategory.DataEntry,
  },
  { name: '级联选择', name_en: 'Cascader', category: WidgetCategory.DataEntry },
  { name: '多选框', name_en: 'Checkbox', category: WidgetCategory.DataEntry },
  {
    name: '颜色选择器',
    name_en: 'ColorPicker',
    category: WidgetCategory.DataEntry,
  },
  {
    name: '日期选择框',
    name_en: 'DatePicker',
    category: WidgetCategory.DataEntry,
  },
  { name: '表单', name_en: 'Form', category: WidgetCategory.DataEntry },
  { name: '输入框', name_en: 'Input', category: WidgetCategory.DataEntry },
  {
    name: '数字输入框',
    name_en: 'InputNumber',
    category: WidgetCategory.DataEntry,
  },
  { name: '提及', name_en: 'Mentions', category: WidgetCategory.DataEntry },
  { name: '单选框', name_en: 'Radio', category: WidgetCategory.DataEntry },
  { name: '评分', name_en: 'Rate', category: WidgetCategory.DataEntry },
  { name: '选择器', name_en: 'Select', category: WidgetCategory.DataEntry },
  { name: '滑动输入条', name_en: 'Slider', category: WidgetCategory.DataEntry },
  { name: '开关', name_en: 'Switch', category: WidgetCategory.DataEntry },
  {
    name: '时间选择框',
    name_en: 'TimePicker',
    category: WidgetCategory.DataEntry,
  },
  { name: '穿梭框', name_en: 'Transfer', category: WidgetCategory.DataEntry },
  { name: '树选择', name_en: 'TreeSelect', category: WidgetCategory.DataEntry },
  { name: '上传', name_en: 'Upload', category: WidgetCategory.DataEntry },
  { name: '头像', name_en: 'Avatar', category: WidgetCategory.DataDisplay },
  { name: '徽标数', name_en: 'Badge', category: WidgetCategory.DataDisplay },
  { name: '日历', name_en: 'Calendar', category: WidgetCategory.DataDisplay },
  { name: '卡片', name_en: 'Card', category: WidgetCategory.DataDisplay },
  { name: '走马灯', name_en: 'Carousel', category: WidgetCategory.DataDisplay },
  {
    name: '折叠面板',
    name_en: 'Collapse',
    category: WidgetCategory.DataDisplay,
  },
  {
    name: '描述列表',
    name_en: 'Descriptions',
    category: WidgetCategory.DataDisplay,
  },
  { name: '空状态', name_en: 'Empty', category: WidgetCategory.DataDisplay },
  { name: '图片', name_en: 'Image', category: WidgetCategory.DataDisplay },
  { name: '列表', name_en: 'List', category: WidgetCategory.DataDisplay },
  {
    name: '气泡卡片',
    name_en: 'Popover',
    category: WidgetCategory.DataDisplay,
  },
  { name: '二维码', name_en: 'QRCode', category: WidgetCategory.DataDisplay },
  {
    name: '分段控制器',
    name_en: 'Segmented',
    category: WidgetCategory.DataDisplay,
  },
  {
    name: '统计数值',
    name_en: 'Statistic',
    category: WidgetCategory.DataDisplay,
  },
  { name: '表格', name_en: 'Table', category: WidgetCategory.DataDisplay },
  { name: '标签页', name_en: 'Tabs', category: WidgetCategory.DataDisplay },
  { name: '标签', name_en: 'Tag', category: WidgetCategory.DataDisplay },
  { name: '时间轴', name_en: 'Timeline', category: WidgetCategory.DataDisplay },
  {
    name: '文字提示',
    name_en: 'Tooltip',
    category: WidgetCategory.DataDisplay,
  },
  { name: '漫游式引导', name_en: 'Tour', category: WidgetCategory.DataDisplay },
  { name: '树形控件', name_en: 'Tree', category: WidgetCategory.DataDisplay },
  { name: '警告提示', name_en: 'Alert', category: WidgetCategory.Feedback },
  { name: '抽屉', name_en: 'Drawer', category: WidgetCategory.Feedback },
  { name: '全局提示', name_en: 'Message', category: WidgetCategory.Feedback },
  { name: '对话框', name_en: 'Modal', category: WidgetCategory.Feedback },
  {
    name: '通知提醒框',
    name_en: 'Notification',
    category: WidgetCategory.Feedback,
  },
  {
    name: '气泡确认框',
    name_en: 'Popconfirm',
    category: WidgetCategory.Feedback,
  },
  { name: '进度条', name_en: 'Progress', category: WidgetCategory.Feedback },
  { name: '结果', name_en: 'Result', category: WidgetCategory.Feedback },
  { name: '骨架屏', name_en: 'Skeleton', category: WidgetCategory.Feedback },
  { name: '加载中', name_en: 'Spin', category: WidgetCategory.Feedback },
  { name: '水印', name_en: 'Watermark', category: WidgetCategory.Feedback },
  { name: '固钉', name_en: 'Affix', category: WidgetCategory.Other },
  { name: '包裹组件', name_en: 'App', category: WidgetCategory.Other },
  {
    name: '全局化配置',
    name_en: 'ConfigProvider',
    category: WidgetCategory.Other,
  },
  { name: '工具类', name_en: 'Util', category: WidgetCategory.Other },
  {
    name: '高级布局',
    name_en: 'ProLayout',
    category: WidgetCategory.Heavyweight,
  },
  {
    name: '高级表单',
    name_en: 'ProForm',
    category: WidgetCategory.Heavyweight,
  },
  {
    name: '高级表格',
    name_en: 'ProTable',
    category: WidgetCategory.Heavyweight,
  },
  {
    name: '高级定义列表',
    name_en: 'ProDescriptions',
    category: WidgetCategory.Heavyweight,
  },
  {
    name: '高级列表',
    name_en: 'ProList',
    category: WidgetCategory.Heavyweight,
  },
  {
    name: '可编辑表格',
    name_en: 'EditableProTable',
    category: WidgetCategory.Heavyweight,
  },
];

const widgets = widgetsData.map((widget) => {
  return {
    name: widget.name,
    name_en: widget.name_en,
    widgetLib: 'antd',
    slots: ['children'],
    platforms: [WidgetPlatformType.PcWeb],
    category: widget.category,
  };
});

async function main() {
  // 创建 root 用户
  const rootUser = {
    name: 'root',
    email: 'root@example.com',
    password: process.env.ROOT_PASSWORD || '123456a.', // 从环境变量读取密码
    isAdmin: true,
  };

  // 创建测试用户
  const testUser = {
    name: 'test',
    email: 'test@example.com',
    password: '', // 空密码
    isAdmin: false,
  };

  let rootUserId: number;

  try {
    const createdRootUser = await userService.createUserWithPassword(rootUser);
    rootUserId = createdRootUser.id;
    console.log('Root user created successfully');

    await userService.createUserWithPassword(testUser);
    console.log('Test user created successfully');
  } catch (error) {
    console.error('Error creating users:', error);
    process.exit(1);
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
            connect: { id: rootUserId }, // 使用 root 用户的 ID
          },
        },
      });
    }

    // 创建 Widget
    const widget = await prismaService.widget.create({
      data: {
        name: widgetData.name,
        name_en: widgetData.name_en,
        platforms: widgetData.platforms,
        category: widgetData.category,
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
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prismaService.$disconnect();
  });
