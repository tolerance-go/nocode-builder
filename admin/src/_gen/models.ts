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

export enum WidgetCategoryEnum {
  General = 'General',
  Layout = 'Layout',
  Navigation = 'Navigation',
  DataEntry = 'DataEntry',
  DataDisplay = 'DataDisplay',
  Feedback = 'Feedback',
  Other = 'Other',
  Heavyweight = 'Heavyweight',
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

  widgetLibs: WidgetLibModel[];

  widgetSlotAssignments: WidgetSlotAssignmentModel[];

  widgetSlotInstanceAssignments: WidgetSlotInstanceAssignmentModel[];

  widgetInstances: WidgetInstanceModel[];

  widgetSlotInstances: WidgetSlotInstanceModel[];

  viewProjects: ViewProjectModel[];

  dataTableProjects: DataTableProjectModel[];

  bluemapProjects: BluemapProjectModel[];

  projectDetails: ProjectDetailModel[];

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
    widgetLibs,
    widgetSlotAssignments,
    widgetSlotInstanceAssignments,
    widgetInstances,
    widgetSlotInstances,
    viewProjects,
    dataTableProjects,
    bluemapProjects,
    projectDetails,
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
    widgetLibs: WidgetLibModel[];
    widgetSlotAssignments: WidgetSlotAssignmentModel[];
    widgetSlotInstanceAssignments: WidgetSlotInstanceAssignmentModel[];
    widgetInstances: WidgetInstanceModel[];
    widgetSlotInstances: WidgetSlotInstanceModel[];
    viewProjects: ViewProjectModel[];
    dataTableProjects: DataTableProjectModel[];
    bluemapProjects: BluemapProjectModel[];
    projectDetails: ProjectDetailModel[];
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
    this.widgetLibs = widgetLibs;
    this.widgetSlotAssignments = widgetSlotAssignments;
    this.widgetSlotInstanceAssignments = widgetSlotInstanceAssignments;
    this.widgetInstances = widgetInstances;
    this.widgetSlotInstances = widgetSlotInstances;
    this.viewProjects = viewProjects;
    this.dataTableProjects = dataTableProjects;
    this.bluemapProjects = bluemapProjects;
    this.projectDetails = projectDetails;
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

  projectDetail: ProjectDetailModel;

  projectDetailId: number;

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
    projectDetail,
    projectDetailId,
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
    projectDetail: ProjectDetailModel;
    projectDetailId: number;
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
    this.projectDetail = projectDetail;
    this.projectDetailId = projectDetailId;
  }
}

export class ProjectDetailModel {
  id: number;

  viewProjectId?: number;

  dataTableProjectId?: number;

  bluemapProjectId?: number;

  ownerId: number;

  owner: UserModel;

  createdAt: Date;

  updatedAt: Date;

  Project: ProjectModel[];

  bluemapProject?: BluemapProjectModel;

  dataTableProject?: DataTableProjectModel;

  viewProject?: ViewProjectModel;

  constructor({
    id,
    viewProjectId,
    dataTableProjectId,
    bluemapProjectId,
    ownerId,
    owner,
    createdAt,
    updatedAt,
    Project,
    bluemapProject,
    dataTableProject,
    viewProject,
  }: {
    id: number;
    viewProjectId?: number;
    dataTableProjectId?: number;
    bluemapProjectId?: number;
    ownerId: number;
    owner: UserModel;
    createdAt: Date;
    updatedAt: Date;
    Project: ProjectModel[];
    bluemapProject?: BluemapProjectModel;
    dataTableProject?: DataTableProjectModel;
    viewProject?: ViewProjectModel;
  }) {
    this.id = id;
    this.viewProjectId = viewProjectId;
    this.dataTableProjectId = dataTableProjectId;
    this.bluemapProjectId = bluemapProjectId;
    this.ownerId = ownerId;
    this.owner = owner;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.Project = Project;
    this.bluemapProject = bluemapProject;
    this.dataTableProject = dataTableProject;
    this.viewProject = viewProject;
  }
}

export class ViewProjectModel {
  id: number;

  platformType: WidgetPlatformTypeEnum;

  ownerId: number;

  owner: UserModel;

  createdAt: Date;

  updatedAt: Date;

  projectDetails: ProjectDetailModel[];

  widgetInstances: WidgetInstanceModel[];

  constructor({
    id,
    platformType,
    ownerId,
    owner,
    createdAt,
    updatedAt,
    projectDetails,
    widgetInstances,
  }: {
    id: number;
    platformType: WidgetPlatformTypeEnum;
    ownerId: number;
    owner: UserModel;
    createdAt: Date;
    updatedAt: Date;
    projectDetails: ProjectDetailModel[];
    widgetInstances: WidgetInstanceModel[];
  }) {
    this.id = id;
    this.platformType = platformType;
    this.ownerId = ownerId;
    this.owner = owner;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.projectDetails = projectDetails;
    this.widgetInstances = widgetInstances;
  }
}

export class WidgetInstanceModel {
  id: number;

  widget: WidgetModel;

  widgetId: number;

  parentSlot?: WidgetSlotInstanceModel;

  parentSlotId?: number;

  order?: number;

  widgetSlotInstanceAssignments: WidgetSlotInstanceAssignmentModel[];

  viewProject?: ViewProjectModel;

  viewProjectId?: number;

  ownerId: number;

  owner: UserModel;

  createdAt: Date;

  updatedAt: Date;

  constructor({
    id,
    widget,
    widgetId,
    parentSlot,
    parentSlotId,
    order,
    widgetSlotInstanceAssignments,
    viewProject,
    viewProjectId,
    ownerId,
    owner,
    createdAt,
    updatedAt,
  }: {
    id: number;
    widget: WidgetModel;
    widgetId: number;
    parentSlot?: WidgetSlotInstanceModel;
    parentSlotId?: number;
    order?: number;
    widgetSlotInstanceAssignments: WidgetSlotInstanceAssignmentModel[];
    viewProject?: ViewProjectModel;
    viewProjectId?: number;
    ownerId: number;
    owner: UserModel;
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.id = id;
    this.widget = widget;
    this.widgetId = widgetId;
    this.parentSlot = parentSlot;
    this.parentSlotId = parentSlotId;
    this.order = order;
    this.widgetSlotInstanceAssignments = widgetSlotInstanceAssignments;
    this.viewProject = viewProject;
    this.viewProjectId = viewProjectId;
    this.ownerId = ownerId;
    this.owner = owner;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export class WidgetModel {
  id: number;

  name: string;

  platforms: WidgetPlatformTypeEnum[];

  widgetSlotAssignments: WidgetSlotAssignmentModel[];

  ownerId: number;

  owner: UserModel;

  widgetLib: WidgetLibModel;

  widgetLibId: number;

  category: WidgetCategoryEnum;

  createdAt: Date;

  updatedAt: Date;

  widgetInstances: WidgetInstanceModel[];

  constructor({
    id,
    name,
    platforms,
    widgetSlotAssignments,
    ownerId,
    owner,
    widgetLib,
    widgetLibId,
    category,
    createdAt,
    updatedAt,
    widgetInstances,
  }: {
    id: number;
    name: string;
    platforms: WidgetPlatformTypeEnum[];
    widgetSlotAssignments: WidgetSlotAssignmentModel[];
    ownerId: number;
    owner: UserModel;
    widgetLib: WidgetLibModel;
    widgetLibId: number;
    category: WidgetCategoryEnum;
    createdAt: Date;
    updatedAt: Date;
    widgetInstances: WidgetInstanceModel[];
  }) {
    this.id = id;
    this.name = name;
    this.platforms = platforms;
    this.widgetSlotAssignments = widgetSlotAssignments;
    this.ownerId = ownerId;
    this.owner = owner;
    this.widgetLib = widgetLib;
    this.widgetLibId = widgetLibId;
    this.category = category;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.widgetInstances = widgetInstances;
  }
}

export class WidgetLibModel {
  id: number;

  name: string;

  widgets: WidgetModel[];

  ownerId: number;

  owner: UserModel;

  createdAt: Date;

  updatedAt: Date;

  constructor({
    id,
    name,
    widgets,
    ownerId,
    owner,
    createdAt,
    updatedAt,
  }: {
    id: number;
    name: string;
    widgets: WidgetModel[];
    ownerId: number;
    owner: UserModel;
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.id = id;
    this.name = name;
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

  widgetSlotAssignments: WidgetSlotAssignmentModel[];

  createdAt: Date;

  updatedAt: Date;

  widgetSlotInstances: WidgetSlotInstanceModel[];

  constructor({
    id,
    name,
    ownerId,
    owner,
    widgetSlotAssignments,
    createdAt,
    updatedAt,
    widgetSlotInstances,
  }: {
    id: number;
    name: string;
    ownerId: number;
    owner: UserModel;
    widgetSlotAssignments: WidgetSlotAssignmentModel[];
    createdAt: Date;
    updatedAt: Date;
    widgetSlotInstances: WidgetSlotInstanceModel[];
  }) {
    this.id = id;
    this.name = name;
    this.ownerId = ownerId;
    this.owner = owner;
    this.widgetSlotAssignments = widgetSlotAssignments;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.widgetSlotInstances = widgetSlotInstances;
  }
}

export class WidgetSlotInstanceModel {
  id: number;

  widgetSlot: WidgetSlotModel;

  widgetSlotId: number;

  widgetSlotInstanceAssignments: WidgetSlotInstanceAssignmentModel[];

  childWidgetInstances: WidgetInstanceModel[];

  ownerId: number;

  owner: UserModel;

  createdAt: Date;

  updatedAt: Date;

  constructor({
    id,
    widgetSlot,
    widgetSlotId,
    widgetSlotInstanceAssignments,
    childWidgetInstances,
    ownerId,
    owner,
    createdAt,
    updatedAt,
  }: {
    id: number;
    widgetSlot: WidgetSlotModel;
    widgetSlotId: number;
    widgetSlotInstanceAssignments: WidgetSlotInstanceAssignmentModel[];
    childWidgetInstances: WidgetInstanceModel[];
    ownerId: number;
    owner: UserModel;
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.id = id;
    this.widgetSlot = widgetSlot;
    this.widgetSlotId = widgetSlotId;
    this.widgetSlotInstanceAssignments = widgetSlotInstanceAssignments;
    this.childWidgetInstances = childWidgetInstances;
    this.ownerId = ownerId;
    this.owner = owner;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export class WidgetSlotInstanceAssignmentModel {
  widgetInstanceId: number;

  slotInstanceId: number;

  widgetInstance: WidgetInstanceModel;

  slotInstance: WidgetSlotInstanceModel;

  ownerId: number;

  owner: UserModel;

  assignedAt: Date;

  constructor({
    widgetInstanceId,
    slotInstanceId,
    widgetInstance,
    slotInstance,
    ownerId,
    owner,
    assignedAt,
  }: {
    widgetInstanceId: number;
    slotInstanceId: number;
    widgetInstance: WidgetInstanceModel;
    slotInstance: WidgetSlotInstanceModel;
    ownerId: number;
    owner: UserModel;
    assignedAt: Date;
  }) {
    this.widgetInstanceId = widgetInstanceId;
    this.slotInstanceId = slotInstanceId;
    this.widgetInstance = widgetInstance;
    this.slotInstance = slotInstance;
    this.ownerId = ownerId;
    this.owner = owner;
    this.assignedAt = assignedAt;
  }
}

export class DataTableProjectModel {
  id: number;

  projectDetails: ProjectDetailModel[];

  ownerId: number;

  owner: UserModel;

  createdAt: Date;

  updatedAt: Date;

  constructor({
    id,
    projectDetails,
    ownerId,
    owner,
    createdAt,
    updatedAt,
  }: {
    id: number;
    projectDetails: ProjectDetailModel[];
    ownerId: number;
    owner: UserModel;
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.id = id;
    this.projectDetails = projectDetails;
    this.ownerId = ownerId;
    this.owner = owner;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export class BluemapProjectModel {
  id: number;

  projectDetails: ProjectDetailModel[];

  ownerId: number;

  owner: UserModel;

  createdAt: Date;

  updatedAt: Date;

  constructor({
    id,
    projectDetails,
    ownerId,
    owner,
    createdAt,
    updatedAt,
  }: {
    id: number;
    projectDetails: ProjectDetailModel[];
    ownerId: number;
    owner: UserModel;
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.id = id;
    this.projectDetails = projectDetails;
    this.ownerId = ownerId;
    this.owner = owner;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
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
