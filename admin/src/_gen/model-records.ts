/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED        ##
 * ---------------------------------------------------------------
 */

import { WidgetPlatformTypeEnum } from './models';
import { ProjectTypeEnum } from './models';
import { WidgetCategoryEnum } from './models';

export class UserModelRecord {
  id: number;

  name: string;

  email?: string;

  password: string;

  createdAt: Date;

  updatedAt: Date;

  isAdmin: boolean;

  constructor({
    id,
    name,
    email,
    password,
    createdAt,
    updatedAt,
    isAdmin,
  }: {
    id: number;
    name: string;
    email?: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    isAdmin: boolean;
  }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.isAdmin = isAdmin;
  }
}

export class ProjectModelRecord {
  id: number;

  name: string;

  ownerId: number;

  createdAt: Date;

  updatedAt: Date;

  projectGroupId?: number;

  type: ProjectTypeEnum;

  constructor({
    id,
    name,
    ownerId,
    createdAt,
    updatedAt,
    projectGroupId,
    type,
  }: {
    id: number;
    name: string;
    ownerId: number;
    createdAt: Date;
    updatedAt: Date;
    projectGroupId?: number;
    type: ProjectTypeEnum;
  }) {
    this.id = id;
    this.name = name;
    this.ownerId = ownerId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.projectGroupId = projectGroupId;
    this.type = type;
  }
}

export class ProjectGroupModelRecord {
  id: number;

  name: string;

  parentGroupId?: number;

  ownerId: number;

  createdAt: Date;

  updatedAt: Date;

  constructor({
    id,
    name,
    parentGroupId,
    ownerId,
    createdAt,
    updatedAt,
  }: {
    id: number;
    name: string;
    parentGroupId?: number;
    ownerId: number;
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.id = id;
    this.name = name;
    this.parentGroupId = parentGroupId;
    this.ownerId = ownerId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export class WidgetLibModelRecord {
  id: number;

  name: string;

  ownerId: number;

  createdAt: Date;

  updatedAt: Date;

  constructor({
    id,
    name,
    ownerId,
    createdAt,
    updatedAt,
  }: {
    id: number;
    name: string;
    ownerId: number;
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.id = id;
    this.name = name;
    this.ownerId = ownerId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export class WidgetInstanceModelRecord {
  id: number;

  widgetId: number;

  parentSlotId?: number;

  order?: number;

  ownerId: number;

  constructor({
    id,
    widgetId,
    parentSlotId,
    order,
    ownerId,
  }: {
    id: number;
    widgetId: number;
    parentSlotId?: number;
    order?: number;
    ownerId: number;
  }) {
    this.id = id;
    this.widgetId = widgetId;
    this.parentSlotId = parentSlotId;
    this.order = order;
    this.ownerId = ownerId;
  }
}

export class WidgetSlotInstanceModelRecord {
  id: number;

  widgetSlotId: number;

  ownerId: number;

  constructor({
    id,
    widgetSlotId,
    ownerId,
  }: {
    id: number;
    widgetSlotId: number;
    ownerId: number;
  }) {
    this.id = id;
    this.widgetSlotId = widgetSlotId;
    this.ownerId = ownerId;
  }
}

export class WidgetSlotInstanceAssignmentModelRecord {
  widgetInstanceId: number;

  slotInstanceId: number;

  ownerId: number;

  assignedAt: Date;

  constructor({
    widgetInstanceId,
    slotInstanceId,
    ownerId,
    assignedAt,
  }: {
    widgetInstanceId: number;
    slotInstanceId: number;
    ownerId: number;
    assignedAt: Date;
  }) {
    this.widgetInstanceId = widgetInstanceId;
    this.slotInstanceId = slotInstanceId;
    this.ownerId = ownerId;
    this.assignedAt = assignedAt;
  }
}

export class WidgetModelRecord {
  id: number;

  name: string;

  platforms: WidgetPlatformTypeEnum[];

  ownerId: number;

  widgetLibId?: number;

  category: WidgetCategoryEnum;

  createdAt: Date;

  updatedAt: Date;

  constructor({
    id,
    name,
    platforms,
    ownerId,
    widgetLibId,
    category,
    createdAt,
    updatedAt,
  }: {
    id: number;
    name: string;
    platforms: WidgetPlatformTypeEnum[];
    ownerId: number;
    widgetLibId?: number;
    category: WidgetCategoryEnum;
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.id = id;
    this.name = name;
    this.platforms = platforms;
    this.ownerId = ownerId;
    this.widgetLibId = widgetLibId;
    this.category = category;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export class WidgetSlotModelRecord {
  id: number;

  name: string;

  ownerId: number;

  createdAt: Date;

  updatedAt: Date;

  constructor({
    id,
    name,
    ownerId,
    createdAt,
    updatedAt,
  }: {
    id: number;
    name: string;
    ownerId: number;
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.id = id;
    this.name = name;
    this.ownerId = ownerId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export class WidgetSlotAssignmentModelRecord {
  widgetId: number;

  slotId: number;

  ownerId: number;

  assignedAt: Date;

  constructor({
    widgetId,
    slotId,
    ownerId,
    assignedAt,
  }: {
    widgetId: number;
    slotId: number;
    ownerId: number;
    assignedAt: Date;
  }) {
    this.widgetId = widgetId;
    this.slotId = slotId;
    this.ownerId = ownerId;
    this.assignedAt = assignedAt;
  }
}
