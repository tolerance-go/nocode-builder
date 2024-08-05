import {
  WidgetCategory,
  WidgetDisplay,
  WidgetPlatformType,
} from '@prisma/client';

export type WidgetData = {
  name: string;
  widgetLib: string;
  category: WidgetCategory;
  platforms: WidgetPlatformType[];
  slots?: string[];
  display: WidgetDisplay;
};
