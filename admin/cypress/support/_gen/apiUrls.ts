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
    route: '/users/{id}',
    path: '/users/${id}',
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
  ProjectController_getProject: {
    method: 'get',
    route: '/projects/{id}',
    path: '/projects/${id}',
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
  ProjectGroupController_getProjectGroup: {
    method: 'get',
    route: '/project-groups/{id}',
    path: '/project-groups/${id}',
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
  WidgetController_getWidget: {
    method: 'get',
    route: '/widgets/{id}',
    path: '/widgets/${id}',
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
  WidgetController_getWidgetsWithSlots: {
    method: 'get',
    route: '/widgets',
    path: '/widgets',
  },
  WidgetController_createWidget: {
    method: 'post',
    route: '/widgets',
    path: '/widgets',
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
  WidgetSlotController_getWidgetSlot: {
    method: 'get',
    route: '/widgetSlots/{id}',
    path: '/widgetSlots/${id}',
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
  WidgetSlotController_createWidgetSlots: {
    method: 'post',
    route: '/widgetSlots/bulk-create',
    path: '/widgetSlots/bulk-create',
  },
} as const;
