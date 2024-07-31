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
} as const;
