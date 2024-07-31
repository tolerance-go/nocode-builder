/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED        ##
 * ---------------------------------------------------------------
 */

export enum WidgetElementTypeEnum {
  Root = 'Root',
  Button = 'Button',
  Table = 'Table',
  Input = 'Input',
}

export enum ProjectTypeEnum {
  View = 'View',
  DataTable = 'DataTable',
  Bluemap = 'Bluemap',
}

export class WidgetModel {
  id: number;

  elementType: WidgetElementTypeEnum;

  slots: WidgetSlotAssignmentModel[];

  constructor({
    id,
    elementType,
    slots,
  }: {
    id: number;
    elementType: WidgetElementTypeEnum;
    slots: WidgetSlotAssignmentModel[];
  }) {
    this.id = id;
    this.elementType = elementType;
    this.slots = slots;
  }
}

export class WidgetSlotAssignmentModel {
  widgetId: number;

  slotId: number;

  widget: WidgetModel;

  slot: WidgetSlotModel;

  assignedAt: Date;

  constructor({
    widgetId,
    slotId,
    widget,
    slot,
    assignedAt,
  }: {
    widgetId: number;
    slotId: number;
    widget: WidgetModel;
    slot: WidgetSlotModel;
    assignedAt: Date;
  }) {
    this.widgetId = widgetId;
    this.slotId = slotId;
    this.widget = widget;
    this.slot = slot;
    this.assignedAt = assignedAt;
  }
}

export class WidgetSlotModel {
  id: number;

  name: string;

  widgets: WidgetSlotAssignmentModel[];

  constructor({
    id,
    name,
    widgets,
  }: {
    id: number;
    name: string;
    widgets: WidgetSlotAssignmentModel[];
  }) {
    this.id = id;
    this.name = name;
    this.widgets = widgets;
  }
}

export class UserModel {
  id: number;

  name: string;

  email?: string;

  password: string;

  projects: ProjectModel[];

  createdAt: Date;

  updatedAt: Date;

  projectGroups: ProjectGroupModel[];

  isAdmin: boolean;

  constructor({
    id,
    name,
    email,
    password,
    projects,
    createdAt,
    updatedAt,
    projectGroups,
    isAdmin,
  }: {
    id: number;
    name: string;
    email?: string;
    password: string;
    projects: ProjectModel[];
    createdAt: Date;
    updatedAt: Date;
    projectGroups: ProjectGroupModel[];
    isAdmin: boolean;
  }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.projects = projects;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.projectGroups = projectGroups;
    this.isAdmin = isAdmin;
  }
}

export class ProjectModel {
  id: number;

  name: string;

  ownerId: number;

  owner: UserModel;

  createdAt: Date;

  updatedAt: Date;

  projectGroup?: ProjectGroupModel;

  projectGroupId?: number;

  type: ProjectTypeEnum;

  constructor({
    id,
    name,
    ownerId,
    owner,
    createdAt,
    updatedAt,
    projectGroup,
    projectGroupId,
    type,
  }: {
    id: number;
    name: string;
    ownerId: number;
    owner: UserModel;
    createdAt: Date;
    updatedAt: Date;
    projectGroup?: ProjectGroupModel;
    projectGroupId?: number;
    type: ProjectTypeEnum;
  }) {
    this.id = id;
    this.name = name;
    this.ownerId = ownerId;
    this.owner = owner;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.projectGroup = projectGroup;
    this.projectGroupId = projectGroupId;
    this.type = type;
  }
}

export class ProjectGroupModel {
  id: number;

  name: string;

  parentGroupId?: number;

  parentGroup?: ProjectGroupModel;

  childGroups: ProjectGroupModel[];

  ownerId: number;

  owner: UserModel;

  projects: ProjectModel[];

  createdAt: Date;

  updatedAt: Date;

  constructor({
    id,
    name,
    parentGroupId,
    parentGroup,
    childGroups,
    ownerId,
    owner,
    projects,
    createdAt,
    updatedAt,
  }: {
    id: number;
    name: string;
    parentGroupId?: number;
    parentGroup?: ProjectGroupModel;
    childGroups: ProjectGroupModel[];
    ownerId: number;
    owner: UserModel;
    projects: ProjectModel[];
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.id = id;
    this.name = name;
    this.parentGroupId = parentGroupId;
    this.parentGroup = parentGroup;
    this.childGroups = childGroups;
    this.ownerId = ownerId;
    this.owner = owner;
    this.projects = projects;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
