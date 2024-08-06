import {
  WidgetCategory,
  WidgetDisplay,
  WidgetPlatformType,
} from '@prisma/client';
import { JsonValue } from '@prisma/client/runtime/library';

export type WidgetData = {
  name: string;
  widgetLib: string;
  category: WidgetCategory;
  platforms: WidgetPlatformType[];
  slots?: string[];
  display: WidgetDisplay;
  defaultProps?: Record<string, JsonValue>;
};

export type WidgetDataRecord = {
  name: string;
  widgetLib: string;
  category: WidgetCategory;
  platforms: WidgetPlatformType[];
  slots?: string[];
  display: WidgetDisplay;
  props: WidgetPropRecord[];
};

export type WidgetPropRecord = {
  key: string;
  value: JsonValue;
};
