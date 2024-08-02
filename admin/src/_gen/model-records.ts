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

  projectDetailId: number;

  constructor({
    id,
    name,
    ownerId,
    createdAt,
    updatedAt,
    projectGroupId,
    type,
    projectDetailId,
  }: {
    id: number;
    name: string;
    ownerId: number;
    createdAt: Date;
    updatedAt: Date;
    projectGroupId?: number;
    type: ProjectTypeEnum;
    projectDetailId: number;
  }) {
    this.id = id;
    this.name = name;
    this.ownerId = ownerId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.projectGroupId = projectGroupId;
    this.type = type;
    this.projectDetailId = projectDetailId;
  }
}

export class ProjectDetailModelRecord {
  id: number;

  viewProjectId?: number;

  dataTableProjectId?: number;

  bluemapProjectId?: number;

  constructor({
    id,
    viewProjectId,
    dataTableProjectId,
    bluemapProjectId,
  }: {
    id: number;
    viewProjectId?: number;
    dataTableProjectId?: number;
    bluemapProjectId?: number;
  }) {
    this.id = id;
    this.viewProjectId = viewProjectId;
    this.dataTableProjectId = dataTableProjectId;
    this.bluemapProjectId = bluemapProjectId;
  }
}

export class ViewProjectModelRecord {
  id: number;

  platformType: WidgetPlatformTypeEnum;

  ownerId: number;

  createdAt: Date;

  updatedAt: Date;

  constructor({
    id,
    platformType,
    ownerId,
    createdAt,
    updatedAt,
  }: {
    id: number;
    platformType: WidgetPlatformTypeEnum;
    ownerId: number;
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.id = id;
    this.platformType = platformType;
    this.ownerId = ownerId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export class DataTableProjectModelRecord {
  id: number;

  ownerId: number;

  createdAt: Date;

  updatedAt: Date;

  constructor({
    id,
    ownerId,
    createdAt,
    updatedAt,
  }: {
    id: number;
    ownerId: number;
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.id = id;
    this.ownerId = ownerId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export class BluemapProjectModelRecord {
  id: number;

  ownerId: number;

  createdAt: Date;

  updatedAt: Date;

  constructor({
    id,
    ownerId,
    createdAt,
    updatedAt,
  }: {
    id: number;
    ownerId: number;
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.id = id;
    this.ownerId = ownerId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
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

  viewProjectId?: number;

  ownerId: number;

  createdAt: Date;

  updatedAt: Date;

  constructor({
    id,
    widgetId,
    parentSlotId,
    order,
    viewProjectId,
    ownerId,
    createdAt,
    updatedAt,
  }: {
    id: number;
    widgetId: number;
    parentSlotId?: number;
    order?: number;
    viewProjectId?: number;
    ownerId: number;
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.id = id;
    this.widgetId = widgetId;
    this.parentSlotId = parentSlotId;
    this.order = order;
    this.viewProjectId = viewProjectId;
    this.ownerId = ownerId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export class WidgetSlotInstanceModelRecord {
  id: number;

  widgetSlotId: number;

  ownerId: number;

  createdAt: Date;

  updatedAt: Date;

  constructor({
    id,
    widgetSlotId,
    ownerId,
    createdAt,
    updatedAt,
  }: {
    id: number;
    widgetSlotId: number;
    ownerId: number;
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.id = id;
    this.widgetSlotId = widgetSlotId;
    this.ownerId = ownerId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
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
