/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED        ##
 * ---------------------------------------------------------------
 */

import { WidgetElementTypeEnum } from './models';
import { ProjectTypeEnum } from './models';

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

export class WidgetModelRecord {
  id: number;

  elementType: WidgetElementTypeEnum;

  ownerId: number;

  createdAt: Date;

  updatedAt: Date;

  constructor({
    id,
    elementType,
    ownerId,
    createdAt,
    updatedAt,
  }: {
    id: number;
    elementType: WidgetElementTypeEnum;
    ownerId: number;
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.id = id;
    this.elementType = elementType;
    this.ownerId = ownerId;
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

  assignedAt: Date;

  constructor({
    widgetId,
    slotId,
    assignedAt,
  }: {
    widgetId: number;
    slotId: number;
    assignedAt: Date;
  }) {
    this.widgetId = widgetId;
    this.slotId = slotId;
    this.assignedAt = assignedAt;
  }
}
