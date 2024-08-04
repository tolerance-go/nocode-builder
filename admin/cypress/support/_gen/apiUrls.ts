/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED        ##
 * ---------------------------------------------------------------
 */

export const apiUrls = {
  AppController_getHello: {
    method: 'get',
    route: '/',
    path: '/',
  },
  SyncController_applyProjectDiff: {
    method: 'post',
    route: '/syncs/apply-operations',
    path: '/syncs/apply-operations',
  },
  AuthController_login: {
    method: 'post',
    route: '/auth/login',
    path: '/auth/login',
  },
  AuthController_register: {
    method: 'post',
    route: '/auth/register',
    path: '/auth/register',
  },
  UserController_getUserByToken: {
    method: 'get',
    route: '/users/getUserByToken',
    path: '/users/getUserByToken',
  },
  UserController_getUser: {
    method: 'get',
    route: '/users/detail/{id}',
    path: '/users/detail/${id}',
  },
  UserController_getUsers: {
    method: 'get',
    route: '/users',
    path: '/users',
  },
  UserController_createUser: {
    method: 'post',
    route: '/users',
    path: '/users',
  },
  UserController_updateUser: {
    method: 'patch',
    route: '/users/{id}',
    path: '/users/${id}',
  },
  UserController_deleteUser: {
    method: 'delete',
    route: '/users/{id}',
    path: '/users/${id}',
  },
  ProjectController_getProject: {
    method: 'get',
    route: '/projects/detail/{id}',
    path: '/projects/detail/${id}',
  },
  ProjectController_getProjects: {
    method: 'get',
    route: '/projects',
    path: '/projects',
  },
  ProjectController_createProject: {
    method: 'post',
    route: '/projects',
    path: '/projects',
  },
  ProjectController_updateProject: {
    method: 'patch',
    route: '/projects/{id}',
    path: '/projects/${id}',
  },
  ProjectController_deleteProject: {
    method: 'delete',
    route: '/projects/{id}',
    path: '/projects/${id}',
  },
  ProjectGroupController_getProjectGroup: {
    method: 'get',
    route: '/project-groups/detail/{id}',
    path: '/project-groups/detail/${id}',
  },
  ProjectGroupController_getProjectGroups: {
    method: 'get',
    route: '/project-groups',
    path: '/project-groups',
  },
  ProjectGroupController_createProjectGroup: {
    method: 'post',
    route: '/project-groups',
    path: '/project-groups',
  },
  ProjectGroupController_updateProjectGroup: {
    method: 'patch',
    route: '/project-groups/{id}',
    path: '/project-groups/${id}',
  },
  ProjectGroupController_deleteProjectGroup: {
    method: 'delete',
    route: '/project-groups/{id}',
    path: '/project-groups/${id}',
  },
  WidgetController_getWidget: {
    method: 'get',
    route: '/widgets/detail/{id}',
    path: '/widgets/detail/${id}',
  },
  WidgetController_getWidgets: {
    method: 'get',
    route: '/widgets',
    path: '/widgets',
  },
  WidgetController_createWidget: {
    method: 'post',
    route: '/widgets',
    path: '/widgets',
  },
  WidgetController_getWidgetsWithLibFilterByPlatform: {
    method: 'get',
    route: '/widgets/filter-by-platform',
    path: '/widgets/filter-by-platform',
  },
  WidgetController_getWidgetsWithSlots: {
    method: 'get',
    route: '/widgets/with-slots',
    path: '/widgets/with-slots',
  },
  WidgetController_addSlot: {
    method: 'post',
    route: '/widgets/add-slot',
    path: '/widgets/add-slot',
  },
  WidgetController_createWidgets: {
    method: 'post',
    route: '/widgets/bulk-create',
    path: '/widgets/bulk-create',
  },
  WidgetController_updateWidget: {
    method: 'patch',
    route: '/widgets/{id}',
    path: '/widgets/${id}',
  },
  WidgetController_deleteWidget: {
    method: 'delete',
    route: '/widgets/{id}',
    path: '/widgets/${id}',
  },
  WidgetController_deleteSlotAssignment: {
    method: 'delete',
    route: '/widgets/{widgetId}/slot/{slotId}',
    path: '/widgets/${widgetId}/slot/${slotId}',
  },
  WidgetSlotController_getWidgetSlot: {
    method: 'get',
    route: '/widgetSlots/detail/{id}',
    path: '/widgetSlots/detail/${id}',
  },
  WidgetSlotController_getWidgetSlots: {
    method: 'get',
    route: '/widgetSlots',
    path: '/widgetSlots',
  },
  WidgetSlotController_createWidgetSlot: {
    method: 'post',
    route: '/widgetSlots',
    path: '/widgetSlots',
  },
  WidgetSlotController_searchWidgetSlotsByName: {
    method: 'get',
    route: '/widgetSlots/search',
    path: '/widgetSlots/search',
  },
  WidgetSlotController_createWidgetSlots: {
    method: 'post',
    route: '/widgetSlots/bulk-create',
    path: '/widgetSlots/bulk-create',
  },
  WidgetSlotController_updateWidgetSlot: {
    method: 'patch',
    route: '/widgetSlots/{id}',
    path: '/widgetSlots/${id}',
  },
  WidgetSlotController_deleteWidgetSlot: {
    method: 'delete',
    route: '/widgetSlots/{id}',
    path: '/widgetSlots/${id}',
  },
  WidgetSlotAssignmentController_getWidgetSlotAssignment: {
    method: 'get',
    route: '/widgetSlotAssignments/{widgetId}/{slotId}',
    path: '/widgetSlotAssignments/${widgetId}/${slotId}',
  },
  WidgetSlotAssignmentController_updateWidgetSlotAssignment: {
    method: 'patch',
    route: '/widgetSlotAssignments/{widgetId}/{slotId}',
    path: '/widgetSlotAssignments/${widgetId}/${slotId}',
  },
  WidgetSlotAssignmentController_deleteWidgetSlotAssignment: {
    method: 'delete',
    route: '/widgetSlotAssignments/{widgetId}/{slotId}',
    path: '/widgetSlotAssignments/${widgetId}/${slotId}',
  },
  WidgetSlotAssignmentController_getWidgetSlotAssignments: {
    method: 'get',
    route: '/widgetSlotAssignments',
    path: '/widgetSlotAssignments',
  },
  WidgetSlotAssignmentController_createWidgetSlotAssignment: {
    method: 'post',
    route: '/widgetSlotAssignments',
    path: '/widgetSlotAssignments',
  },
  WidgetSlotAssignmentController_createWidgetSlotAssignments: {
    method: 'post',
    route: '/widgetSlotAssignments/bulk-create',
    path: '/widgetSlotAssignments/bulk-create',
  },
  ProjectDetailController_getProjectDetail: {
    method: 'get',
    route: '/projectDetails/detail/{id}',
    path: '/projectDetails/detail/${id}',
  },
  ProjectDetailController_getProjectDetails: {
    method: 'get',
    route: '/projectDetails',
    path: '/projectDetails',
  },
  ProjectDetailController_createProjectDetail: {
    method: 'post',
    route: '/projectDetails',
    path: '/projectDetails',
  },
  ProjectDetailController_updateProjectDetail: {
    method: 'patch',
    route: '/projectDetails/{id}',
    path: '/projectDetails/${id}',
  },
  ProjectDetailController_deleteProjectDetail: {
    method: 'delete',
    route: '/projectDetails/{id}',
    path: '/projectDetails/${id}',
  },
  ViewProjectController_getViewProject: {
    method: 'get',
    route: '/viewProjects/detail/{id}',
    path: '/viewProjects/detail/${id}',
  },
  ViewProjectController_getViewProjects: {
    method: 'get',
    route: '/viewProjects',
    path: '/viewProjects',
  },
  ViewProjectController_createViewProject: {
    method: 'post',
    route: '/viewProjects',
    path: '/viewProjects',
  },
  ViewProjectController_updateViewProject: {
    method: 'patch',
    route: '/viewProjects/{id}',
    path: '/viewProjects/${id}',
  },
  ViewProjectController_deleteViewProject: {
    method: 'delete',
    route: '/viewProjects/{id}',
    path: '/viewProjects/${id}',
  },
  DataTableProjectController_getDataTableProject: {
    method: 'get',
    route: '/dataTableProjects/detail/{id}',
    path: '/dataTableProjects/detail/${id}',
  },
  DataTableProjectController_getDataTableProjects: {
    method: 'get',
    route: '/dataTableProjects',
    path: '/dataTableProjects',
  },
  DataTableProjectController_createDataTableProject: {
    method: 'post',
    route: '/dataTableProjects',
    path: '/dataTableProjects',
  },
  DataTableProjectController_updateDataTableProject: {
    method: 'patch',
    route: '/dataTableProjects/{id}',
    path: '/dataTableProjects/${id}',
  },
  DataTableProjectController_deleteDataTableProject: {
    method: 'delete',
    route: '/dataTableProjects/{id}',
    path: '/dataTableProjects/${id}',
  },
  BluemapProjectController_getBluemapProject: {
    method: 'get',
    route: '/bluemapProjects/detail/{id}',
    path: '/bluemapProjects/detail/${id}',
  },
  BluemapProjectController_getBluemapProjects: {
    method: 'get',
    route: '/bluemapProjects',
    path: '/bluemapProjects',
  },
  BluemapProjectController_createBluemapProject: {
    method: 'post',
    route: '/bluemapProjects',
    path: '/bluemapProjects',
  },
  BluemapProjectController_updateBluemapProject: {
    method: 'patch',
    route: '/bluemapProjects/{id}',
    path: '/bluemapProjects/${id}',
  },
  BluemapProjectController_deleteBluemapProject: {
    method: 'delete',
    route: '/bluemapProjects/{id}',
    path: '/bluemapProjects/${id}',
  },
  WidgetLibController_getWidgetLib: {
    method: 'get',
    route: '/widgetLibs/detail/{id}',
    path: '/widgetLibs/detail/${id}',
  },
  WidgetLibController_getWidgetLibs: {
    method: 'get',
    route: '/widgetLibs',
    path: '/widgetLibs',
  },
  WidgetLibController_createWidgetLib: {
    method: 'post',
    route: '/widgetLibs',
    path: '/widgetLibs',
  },
  WidgetLibController_updateWidgetLib: {
    method: 'patch',
    route: '/widgetLibs/{id}',
    path: '/widgetLibs/${id}',
  },
  WidgetLibController_deleteWidgetLib: {
    method: 'delete',
    route: '/widgetLibs/{id}',
    path: '/widgetLibs/${id}',
  },
} as const;
