/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED        ##
 * ---------------------------------------------------------------
 */

export enum WidgetPlatformTypeEnum {
  PcWeb = 'PcWeb',
  MobileWeb = 'MobileWeb',
  MiniProgram = 'MiniProgram',
  NativeMobile = 'NativeMobile',
  DesktopClient = 'DesktopClient',
}

export enum ProjectTypeEnum {
  View = 'View',
  DataTable = 'DataTable',
  Bluemap = 'Bluemap',
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

  widgets: WidgetModel[];

  widgetSlots: WidgetSlotModel[];

  WidgetSlotAssignments: WidgetSlotAssignmentModel[];

  widgetLibs: WidgetLibModel[];

  components: ComponentModel[];

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
    widgets,
    widgetSlots,
    WidgetSlotAssignments,
    widgetLibs,
    components,
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
    widgets: WidgetModel[];
    widgetSlots: WidgetSlotModel[];
    WidgetSlotAssignments: WidgetSlotAssignmentModel[];
    widgetLibs: WidgetLibModel[];
    components: ComponentModel[];
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
    this.widgets = widgets;
    this.widgetSlots = widgetSlots;
    this.WidgetSlotAssignments = WidgetSlotAssignments;
    this.widgetLibs = widgetLibs;
    this.components = components;
  }
}

export class WidgetModel {
  id: number;

  component: ComponentModel;

  name: string;

  slots: WidgetSlotAssignmentModel[];

  ownerId: number;

  owner: UserModel;

  componentId: number;

  widgetLib?: WidgetLibModel;

  widgetLibId?: number;

  createdAt: Date;

  updatedAt: Date;

  constructor({
    id,
    component,
    name,
    slots,
    ownerId,
    owner,
    componentId,
    widgetLib,
    widgetLibId,
    createdAt,
    updatedAt,
  }: {
    id: number;
    component: ComponentModel;
    name: string;
    slots: WidgetSlotAssignmentModel[];
    ownerId: number;
    owner: UserModel;
    componentId: number;
    widgetLib?: WidgetLibModel;
    widgetLibId?: number;
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.id = id;
    this.component = component;
    this.name = name;
    this.slots = slots;
    this.ownerId = ownerId;
    this.owner = owner;
    this.componentId = componentId;
    this.widgetLib = widgetLib;
    this.widgetLibId = widgetLibId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export class WidgetLibModel {
  id: number;

  widgets: WidgetModel[];

  ownerId: number;

  owner: UserModel;

  createdAt: Date;

  updatedAt: Date;

  constructor({
    id,
    widgets,
    ownerId,
    owner,
    createdAt,
    updatedAt,
  }: {
    id: number;
    widgets: WidgetModel[];
    ownerId: number;
    owner: UserModel;
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.id = id;
    this.widgets = widgets;
    this.ownerId = ownerId;
    this.owner = owner;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export class WidgetSlotAssignmentModel {
  widgetId: number;

  slotId: number;

  widget: WidgetModel;

  slot: WidgetSlotModel;

  ownerId: number;

  owner: UserModel;

  assignedAt: Date;

  constructor({
    widgetId,
    slotId,
    widget,
    slot,
    ownerId,
    owner,
    assignedAt,
  }: {
    widgetId: number;
    slotId: number;
    widget: WidgetModel;
    slot: WidgetSlotModel;
    ownerId: number;
    owner: UserModel;
    assignedAt: Date;
  }) {
    this.widgetId = widgetId;
    this.slotId = slotId;
    this.widget = widget;
    this.slot = slot;
    this.ownerId = ownerId;
    this.owner = owner;
    this.assignedAt = assignedAt;
  }
}

export class WidgetSlotModel {
  id: number;

  name: string;

  ownerId: number;

  owner: UserModel;

  widgets: WidgetSlotAssignmentModel[];

  createdAt: Date;

  updatedAt: Date;

  constructor({
    id,
    name,
    ownerId,
    owner,
    widgets,
    createdAt,
    updatedAt,
  }: {
    id: number;
    name: string;
    ownerId: number;
    owner: UserModel;
    widgets: WidgetSlotAssignmentModel[];
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.id = id;
    this.name = name;
    this.ownerId = ownerId;
    this.owner = owner;
    this.widgets = widgets;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export class ComponentModel {
  id: number;

  name: string;

  widgets: WidgetModel[];

  platforms: WidgetPlatformTypeEnum[];

  ownerId: number;

  owner: UserModel;

  createdAt: Date;

  updatedAt: Date;

  constructor({
    id,
    name,
    widgets,
    platforms,
    ownerId,
    owner,
    createdAt,
    updatedAt,
  }: {
    id: number;
    name: string;
    widgets: WidgetModel[];
    platforms: WidgetPlatformTypeEnum[];
    ownerId: number;
    owner: UserModel;
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.id = id;
    this.name = name;
    this.widgets = widgets;
    this.platforms = platforms;
    this.ownerId = ownerId;
    this.owner = owner;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
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
