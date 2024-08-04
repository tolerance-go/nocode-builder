/* eslint-disable sort-class-members/sort-class-members */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED        ##
 * ---------------------------------------------------------------
 */

export interface UserModelRecordDto {
  id: number;
  name: string;
  email?: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  isAdmin: boolean;
}

export interface ProjectModelRecordDto {
  id: number;
  name: string;
  ownerId: number;
  createdAt: string;
  updatedAt: string;
  projectGroupId?: number;
  type: 'View' | 'DataTable' | 'Bluemap';
  projectDetailId: number;
}

export interface ProjectGroupModelRecordDto {
  id: number;
  name: string;
  parentGroupId?: number;
  ownerId: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectDetailModelRecordDto {
  id: number;
  viewProjectId?: number;
  dataTableProjectId?: number;
  bluemapProjectId?: number;
  ownerId: number;
  createdAt: string;
  updatedAt: string;
}

export interface ViewProjectModelRecordDto {
  id: number;
  platformType:
    | 'PcWeb'
    | 'MobileWeb'
    | 'MiniProgram'
    | 'NativeMobile'
    | 'DesktopClient';
  ownerId: number;
  createdAt: string;
  updatedAt: string;
}

export interface DataTableProjectModelRecordDto {
  id: number;
  ownerId: number;
  createdAt: string;
  updatedAt: string;
}

export interface BluemapProjectModelRecordDto {
  id: number;
  ownerId: number;
  createdAt: string;
  updatedAt: string;
}

export interface OperationRecordUnionDto {
  userOperationRecord?: UserModelRecordDto;
  projectOperationRecord?: ProjectModelRecordDto;
  projectGroupOperationRecord?: ProjectGroupModelRecordDto;
  projectDetailOperationRecord?: ProjectDetailModelRecordDto;
  viewProjectOperationRecord?: ViewProjectModelRecordDto;
  dataTableProjectOperationRecord?: DataTableProjectModelRecordDto;
  bluemapProjectOperationRecord?: BluemapProjectModelRecordDto;
}

export interface OperationDto {
  tableName:
    | 'User'
    | 'Project'
    | 'ProjectGroup'
    | 'ProjectDetail'
    | 'ViewProject'
    | 'DataTableProject'
    | 'BluemapProject';
  operation: 'clearRecords' | 'addRecord' | 'updateRecord' | 'deleteRecord';
  record?: OperationRecordUnionDto;
}

export interface OperationsDto {
  operations: OperationDto[];
}

export interface LoginDto {
  username: string;
  password: string;
}

export interface LoginResponseDto {
  accessToken: string;
}

export interface RegisterDto {
  username: string;
  password: string;
  autoLogin: boolean;
}

export interface UserResponseDto {
  id: number;
  name: string;
  email?: string;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserCreateDto {
  name: string;
  email?: string;
  password: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserUpdateDto {
  name?: string;
  email?: string;
  password?: string;
  updatedAt?: string;
}

export interface ProjectResponseDto {
  id: number;
  name: string;
  type: 'View' | 'DataTable' | 'Bluemap';
  projectGroupId?: number;
  projectDetailId: number;
  ownerId: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectCreateDto {
  name: string;
  projectGroupId?: number;
  projectDetailId?: number;
  createdAt?: string;
  updatedAt?: string;
  type: 'View' | 'DataTable' | 'Bluemap';
}

export interface ProjectUpdateDto {
  name?: string;
  projectGroupId?: number;
}

export interface ProjectGroupResponseDto {
  id: number;
  name: string;
  parentGroupId?: number;
  ownerId: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectGroupCreateDto {
  name: string;
  parentGroupId?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProjectGroupUpdateDto {
  name?: string;
  parentGroupId?: number;
}

export interface WidgetResponseDto {
  id: number;
  name: string;
  platforms: (
    | 'PcWeb'
    | 'MobileWeb'
    | 'MiniProgram'
    | 'NativeMobile'
    | 'DesktopClient'
  )[];
  category:
    | 'General'
    | 'Layout'
    | 'Navigation'
    | 'DataEntry'
    | 'DataDisplay'
    | 'Feedback'
    | 'Other'
    | 'Heavyweight';
  ownerId: number;
  createdAt: string;
  updatedAt: string;
}

export interface WidgetLibResponseDto {
  id: number;
  name: string;
  ownerId: number;
  createdAt: string;
  updatedAt: string;
}

export interface WidgetWithLibResponseDto {
  id: number;
  name: string;
  platforms: (
    | 'PcWeb'
    | 'MobileWeb'
    | 'MiniProgram'
    | 'NativeMobile'
    | 'DesktopClient'
  )[];
  category:
    | 'General'
    | 'Layout'
    | 'Navigation'
    | 'DataEntry'
    | 'DataDisplay'
    | 'Feedback'
    | 'Other'
    | 'Heavyweight';
  ownerId: number;
  createdAt: string;
  updatedAt: string;
  widgetLib: WidgetLibResponseDto;
}

export interface WidgetSlotResponseDto {
  id: number;
  name: string;
  ownerId: number;
  createdAt: string;
  updatedAt: string;
}

export interface WidgetSlotAssignmentWithSlotsResponseDto {
  widgetId: number;
  slotId: number;
  ownerId: number;
  assignedAt: string;
  slot: WidgetSlotResponseDto;
}

export interface WidgetWithSlotsResponseDto {
  id: number;
  name: string;
  platforms: (
    | 'PcWeb'
    | 'MobileWeb'
    | 'MiniProgram'
    | 'NativeMobile'
    | 'DesktopClient'
  )[];
  category:
    | 'General'
    | 'Layout'
    | 'Navigation'
    | 'DataEntry'
    | 'DataDisplay'
    | 'Feedback'
    | 'Other'
    | 'Heavyweight';
  ownerId: number;
  createdAt: string;
  updatedAt: string;
  widgetSlotAssignments: WidgetSlotAssignmentWithSlotsResponseDto[];
}

export interface WidgetCreateDto {
  name: string;
  order: number;
  widgetLibId: number;
  platforms: (
    | 'PcWeb'
    | 'MobileWeb'
    | 'MiniProgram'
    | 'NativeMobile'
    | 'DesktopClient'
  )[];
  category:
    | 'General'
    | 'Layout'
    | 'Navigation'
    | 'DataEntry'
    | 'DataDisplay'
    | 'Feedback'
    | 'Other'
    | 'Heavyweight';
}

export interface WidgetSlotCreateDto {
  name: string;
}

export interface WidgetAddSlotDto {
  widgetId: number;
  slot: WidgetSlotCreateDto;
}

export interface WidgetCreateManyDto {
  createDtos: WidgetCreateDto[];
}

export interface CountDto {
  count: number;
}

export type WidgetUpdateDto = Record<string, unknown>;

export interface WidgetSlotCreateManyDto {
  createDtos: WidgetSlotCreateDto[];
}

export interface WidgetSlotUpdateDto {
  name: string;
}

export interface WidgetSlotAssignmentResponseDto {
  widgetId: number;
  slotId: number;
  ownerId: number;
  assignedAt: string;
}

export interface WidgetSlotAssignmentCreateDto {
  widgetId: number;
  slotId: number;
}

export interface WidgetSlotAssignmentCreateManyDto {
  createDtos: WidgetSlotAssignmentCreateDto[];
}

export type WidgetSlotAssignmentUpdateDto = Record<string, unknown>;

export interface ProjectDetailResponseDto {
  id: number;
  ownerId: number;
  viewProjectId: number;
  dataTableProjectId: number;
  bluemapProjectId: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectDetailCreateDto {
  viewProjectId: number;
  dataTableProjectId: number;
  bluemapProjectId: number;
  createdAt?: string;
  updatedAt?: string;
}

export type ProjectDetailUpdateDto = Record<string, unknown>;

export interface ViewProjectResponseDto {
  id: number;
  ownerId: number;
  platformType:
    | 'PcWeb'
    | 'MobileWeb'
    | 'MiniProgram'
    | 'NativeMobile'
    | 'DesktopClient';
  createdAt: string;
  updatedAt: string;
}

export interface ViewProjectCreateDto {
  platformType:
    | 'PcWeb'
    | 'MobileWeb'
    | 'MiniProgram'
    | 'NativeMobile'
    | 'DesktopClient';
  createdAt?: string;
  updatedAt?: string;
}

export type ViewProjectUpdateDto = Record<string, unknown>;

export interface DataTableProjectResponseDto {
  id: number;
  ownerId: number;
  createdAt: string;
  updatedAt: string;
}

export interface DataTableProjectCreateDto {
  createdAt?: string;
  updatedAt?: string;
}

export type DataTableProjectUpdateDto = Record<string, unknown>;

export interface BluemapProjectResponseDto {
  id: number;
  ownerId: number;
  createdAt: string;
  updatedAt: string;
}

export interface BluemapProjectCreateDto {
  createdAt?: string;
  updatedAt?: string;
}

export type BluemapProjectUpdateDto = Record<string, unknown>;

export interface WidgetLibCreateDto {
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

export type WidgetLibUpdateDto = Record<string, unknown>;

import type {
  AxiosInstance,
  AxiosRequestConfig,
  HeadersDefaults,
  ResponseType,
} from 'axios';
import axios from 'axios';

export type QueryParamsType = Record<string | number, unknown>;

export interface FullRequestParams
  extends Omit<AxiosRequestConfig, 'data' | 'params' | 'url' | 'responseType'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<
  FullRequestParams,
  'body' | 'method' | 'query' | 'path'
>;

export interface ApiConfig<SecurityDataType = unknown>
  extends Omit<AxiosRequestConfig, 'data' | 'cancelToken'> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
  Text = 'text/plain',
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker'];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({
    securityWorker,
    secure,
    format,
    ...axiosConfig
  }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL: axiosConfig.baseURL || '',
    });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig,
  ): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method &&
          this.instance.defaults.headers[
            method.toLowerCase() as keyof HeadersDefaults
          ]) ||
          {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === 'object' && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: unknown[] =
        property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(
          key,
          isFileType ? formItem : this.stringifyFormItem(formItem),
        );
      }

      return formData;
    }, new FormData());
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public request = async <T = unknown, _E = unknown>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<T> => {
    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (
      type === ContentType.FormData &&
      body &&
      body !== null &&
      typeof body === 'object'
    ) {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (
      type === ContentType.Text &&
      body &&
      body !== null &&
      typeof body !== 'string'
    ) {
      body = JSON.stringify(body);
    }

    return this.instance
      .request({
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData
            ? { 'Content-Type': type }
            : {}),
        },
        params: query,
        responseType: responseFormat,
        data: body,
        url: path,
      })
      .then((response) => response.data);
  };
}

/**
 * @title UNOCODE api docs
 * @version 1.0
 * @contact
 *
 * The UNOCODE API description
 */
export class Api<SecurityDataType> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @name AppControllerGetHello
   * @request GET:/
   */
  getHello = (params: RequestParams = {}) =>
    this.request<void, unknown>({
      path: `/`,
      method: 'GET',
      ...params,
    });

  syncs = {
    /**
     * No description
     *
     * @name SyncControllerApplyProjectDiff
     * @request POST:/syncs/apply-operations
     */
    applyProjectDiff: (data: OperationsDto, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/syncs/apply-operations`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),
  };
  auth = {
    /**
     * No description
     *
     * @name AuthControllerLogin
     * @request POST:/auth/login
     */
    login: (data: LoginDto, params: RequestParams = {}) =>
      this.request<LoginResponseDto, unknown>({
        path: `/auth/login`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name AuthControllerRegister
     * @request POST:/auth/register
     */
    register: (data: RegisterDto, params: RequestParams = {}) =>
      this.request<LoginResponseDto | UserResponseDto, unknown>({
        path: `/auth/register`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),
  };
  users = {
    /**
     * No description
     *
     * @name UserControllerGetUserByToken
     * @request GET:/users/getUserByToken
     */
    getUserByToken: (params: RequestParams = {}) =>
      this.request<UserResponseDto, unknown>({
        path: `/users/getUserByToken`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name UserControllerGetUser
     * @request GET:/users/detail/{id}
     */
    getUser: (id: string, params: RequestParams = {}) =>
      this.request<UserResponseDto, unknown>({
        path: `/users/detail/${id}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name UserControllerGetUsers
     * @request GET:/users
     */
    getUsers: (
      query?: {
        skip?: number;
        take?: number;
        orderBy?: string;
        filter?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<UserResponseDto[], unknown>({
        path: `/users`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name UserControllerCreateUser
     * @request POST:/users
     */
    createUser: (data: UserCreateDto, params: RequestParams = {}) =>
      this.request<UserResponseDto, void>({
        path: `/users`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name UserControllerUpdateUser
     * @request PATCH:/users/{id}
     */
    updateUser: (id: string, data: UserUpdateDto, params: RequestParams = {}) =>
      this.request<UserResponseDto, unknown>({
        path: `/users/${id}`,
        method: 'PATCH',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name UserControllerDeleteUser
     * @request DELETE:/users/{id}
     */
    deleteUser: (id: string, params: RequestParams = {}) =>
      this.request<UserResponseDto, unknown>({
        path: `/users/${id}`,
        method: 'DELETE',
        format: 'json',
        ...params,
      }),
  };
  projects = {
    /**
     * No description
     *
     * @name ProjectControllerGetProject
     * @request GET:/projects/detail/{id}
     */
    getProject: (id: string, params: RequestParams = {}) =>
      this.request<ProjectResponseDto, unknown>({
        path: `/projects/detail/${id}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name ProjectControllerGetProjects
     * @request GET:/projects
     */
    getProjects: (
      query?: {
        skip?: number;
        take?: number;
        orderBy?: string;
        filter?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ProjectResponseDto[], unknown>({
        path: `/projects`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name ProjectControllerCreateProject
     * @request POST:/projects
     */
    createProject: (data: ProjectCreateDto, params: RequestParams = {}) =>
      this.request<ProjectResponseDto, void>({
        path: `/projects`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name ProjectControllerUpdateProject
     * @request PATCH:/projects/{id}
     */
    updateProject: (
      id: string,
      data: ProjectUpdateDto,
      params: RequestParams = {},
    ) =>
      this.request<ProjectResponseDto, unknown>({
        path: `/projects/${id}`,
        method: 'PATCH',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name ProjectControllerDeleteProject
     * @request DELETE:/projects/{id}
     */
    deleteProject: (id: string, params: RequestParams = {}) =>
      this.request<ProjectResponseDto, unknown>({
        path: `/projects/${id}`,
        method: 'DELETE',
        format: 'json',
        ...params,
      }),
  };
  projectGroups = {
    /**
     * No description
     *
     * @name ProjectGroupControllerGetProjectGroup
     * @request GET:/project-groups/detail/{id}
     */
    getProjectGroup: (id: string, params: RequestParams = {}) =>
      this.request<ProjectGroupResponseDto, unknown>({
        path: `/project-groups/detail/${id}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name ProjectGroupControllerGetProjectGroups
     * @request GET:/project-groups
     */
    getProjectGroups: (
      query?: {
        skip?: number;
        take?: number;
        orderBy?: string;
        filter?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ProjectGroupResponseDto[], unknown>({
        path: `/project-groups`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name ProjectGroupControllerCreateProjectGroup
     * @request POST:/project-groups
     */
    createProjectGroup: (
      data: ProjectGroupCreateDto,
      params: RequestParams = {},
    ) =>
      this.request<ProjectGroupResponseDto, void>({
        path: `/project-groups`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name ProjectGroupControllerUpdateProjectGroup
     * @request PATCH:/project-groups/{id}
     */
    updateProjectGroup: (
      id: string,
      data: ProjectGroupUpdateDto,
      params: RequestParams = {},
    ) =>
      this.request<ProjectGroupResponseDto, unknown>({
        path: `/project-groups/${id}`,
        method: 'PATCH',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name ProjectGroupControllerDeleteProjectGroup
     * @request DELETE:/project-groups/{id}
     */
    deleteProjectGroup: (id: string, params: RequestParams = {}) =>
      this.request<ProjectGroupResponseDto, unknown>({
        path: `/project-groups/${id}`,
        method: 'DELETE',
        format: 'json',
        ...params,
      }),
  };
  widgets = {
    /**
     * No description
     *
     * @name WidgetControllerGetWidget
     * @request GET:/widgets/detail/{id}
     */
    getWidget: (id: string, params: RequestParams = {}) =>
      this.request<WidgetResponseDto, unknown>({
        path: `/widgets/detail/${id}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name WidgetControllerGetWidgets
     * @request GET:/widgets
     */
    getWidgets: (
      query?: {
        skip?: number;
        take?: number;
        orderBy?: string;
        filter?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<WidgetResponseDto[], unknown>({
        path: `/widgets`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name WidgetControllerCreateWidget
     * @request POST:/widgets
     */
    createWidget: (data: WidgetCreateDto, params: RequestParams = {}) =>
      this.request<WidgetResponseDto, void>({
        path: `/widgets`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name WidgetControllerGetWidgetsWithLibFilterByPlatform
     * @request GET:/widgets/filter-by-platform
     */
    getWidgetsWithLibFilterByPlatform: (
      query: {
        skip?: number;
        take?: number;
        orderBy?: string;
        filter?: string;
        platformType:
          | 'PcWeb'
          | 'MobileWeb'
          | 'MiniProgram'
          | 'NativeMobile'
          | 'DesktopClient';
      },
      params: RequestParams = {},
    ) =>
      this.request<WidgetWithLibResponseDto[], unknown>({
        path: `/widgets/filter-by-platform`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name WidgetControllerGetWidgetsWithSlots
     * @request GET:/widgets/with-slots
     */
    getWidgetsWithSlots: (
      query?: {
        skip?: number;
        take?: number;
        orderBy?: string;
        filter?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<WidgetWithSlotsResponseDto[], unknown>({
        path: `/widgets/with-slots`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name WidgetControllerAddSlot
     * @request POST:/widgets/add-slot
     */
    addSlot: (data: WidgetAddSlotDto, params: RequestParams = {}) =>
      this.request<WidgetResponseDto, void>({
        path: `/widgets/add-slot`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name WidgetControllerCreateWidgets
     * @request POST:/widgets/bulk-create
     */
    createWidgets: (data: WidgetCreateManyDto, params: RequestParams = {}) =>
      this.request<CountDto, void>({
        path: `/widgets/bulk-create`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name WidgetControllerUpdateWidget
     * @request PATCH:/widgets/{id}
     */
    updateWidget: (
      id: string,
      data: WidgetUpdateDto,
      params: RequestParams = {},
    ) =>
      this.request<WidgetResponseDto, unknown>({
        path: `/widgets/${id}`,
        method: 'PATCH',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name WidgetControllerDeleteWidget
     * @request DELETE:/widgets/{id}
     */
    deleteWidget: (id: string, params: RequestParams = {}) =>
      this.request<WidgetResponseDto, unknown>({
        path: `/widgets/${id}`,
        method: 'DELETE',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name WidgetControllerDeleteSlotAssignment
     * @request DELETE:/widgets/{widgetId}/slot/{slotId}
     */
    deleteSlotAssignment: (
      widgetId: number,
      slotId: number,
      params: RequestParams = {},
    ) =>
      this.request<void, unknown>({
        path: `/widgets/${widgetId}/slot/${slotId}`,
        method: 'DELETE',
        ...params,
      }),
  };
  widgetSlots = {
    /**
     * No description
     *
     * @name WidgetSlotControllerGetWidgetSlot
     * @request GET:/widgetSlots/detail/{id}
     */
    getWidgetSlot: (id: string, params: RequestParams = {}) =>
      this.request<WidgetSlotResponseDto, unknown>({
        path: `/widgetSlots/detail/${id}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name WidgetSlotControllerGetWidgetSlots
     * @request GET:/widgetSlots
     */
    getWidgetSlots: (
      query?: {
        skip?: number;
        take?: number;
        orderBy?: string;
        filter?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<WidgetSlotResponseDto[], unknown>({
        path: `/widgetSlots`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name WidgetSlotControllerCreateWidgetSlot
     * @request POST:/widgetSlots
     */
    createWidgetSlot: (data: WidgetSlotCreateDto, params: RequestParams = {}) =>
      this.request<WidgetSlotResponseDto, void>({
        path: `/widgetSlots`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name WidgetSlotControllerSearchWidgetSlotsByName
     * @request GET:/widgetSlots/search
     */
    searchWidgetSlotsByName: (
      query: {
        name: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<WidgetSlotResponseDto[], unknown>({
        path: `/widgetSlots/search`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name WidgetSlotControllerCreateWidgetSlots
     * @request POST:/widgetSlots/bulk-create
     */
    createWidgetSlots: (
      data: WidgetSlotCreateManyDto,
      params: RequestParams = {},
    ) =>
      this.request<CountDto, void>({
        path: `/widgetSlots/bulk-create`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name WidgetSlotControllerUpdateWidgetSlot
     * @request PATCH:/widgetSlots/{id}
     */
    updateWidgetSlot: (
      id: string,
      data: WidgetSlotUpdateDto,
      params: RequestParams = {},
    ) =>
      this.request<WidgetSlotResponseDto, unknown>({
        path: `/widgetSlots/${id}`,
        method: 'PATCH',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name WidgetSlotControllerDeleteWidgetSlot
     * @request DELETE:/widgetSlots/{id}
     */
    deleteWidgetSlot: (id: string, params: RequestParams = {}) =>
      this.request<WidgetSlotResponseDto, unknown>({
        path: `/widgetSlots/${id}`,
        method: 'DELETE',
        format: 'json',
        ...params,
      }),
  };
  widgetSlotAssignments = {
    /**
     * No description
     *
     * @name WidgetSlotAssignmentControllerGetWidgetSlotAssignment
     * @request GET:/widgetSlotAssignments/{widgetId}/{slotId}
     */
    getWidgetSlotAssignment: (
      widgetId: number,
      slotId: number,
      params: RequestParams = {},
    ) =>
      this.request<WidgetSlotAssignmentResponseDto, unknown>({
        path: `/widgetSlotAssignments/${widgetId}/${slotId}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name WidgetSlotAssignmentControllerUpdateWidgetSlotAssignment
     * @request PATCH:/widgetSlotAssignments/{widgetId}/{slotId}
     */
    updateWidgetSlotAssignment: (
      widgetId: number,
      slotId: number,
      data: WidgetSlotAssignmentUpdateDto,
      params: RequestParams = {},
    ) =>
      this.request<WidgetSlotAssignmentResponseDto, unknown>({
        path: `/widgetSlotAssignments/${widgetId}/${slotId}`,
        method: 'PATCH',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name WidgetSlotAssignmentControllerDeleteWidgetSlotAssignment
     * @request DELETE:/widgetSlotAssignments/{widgetId}/{slotId}
     */
    deleteWidgetSlotAssignment: (
      widgetId: number,
      slotId: number,
      params: RequestParams = {},
    ) =>
      this.request<WidgetSlotAssignmentResponseDto, unknown>({
        path: `/widgetSlotAssignments/${widgetId}/${slotId}`,
        method: 'DELETE',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name WidgetSlotAssignmentControllerGetWidgetSlotAssignments
     * @request GET:/widgetSlotAssignments
     */
    getWidgetSlotAssignments: (
      query?: {
        skip?: number;
        take?: number;
        orderBy?: string;
        filterWidgetId?: number;
        filterSlotId?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<WidgetSlotAssignmentResponseDto[], unknown>({
        path: `/widgetSlotAssignments`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name WidgetSlotAssignmentControllerCreateWidgetSlotAssignment
     * @request POST:/widgetSlotAssignments
     */
    createWidgetSlotAssignment: (
      data: WidgetSlotAssignmentCreateDto,
      params: RequestParams = {},
    ) =>
      this.request<WidgetSlotAssignmentResponseDto, void>({
        path: `/widgetSlotAssignments`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name WidgetSlotAssignmentControllerCreateWidgetSlotAssignments
     * @request POST:/widgetSlotAssignments/bulk-create
     */
    createWidgetSlotAssignments: (
      data: WidgetSlotAssignmentCreateManyDto,
      params: RequestParams = {},
    ) =>
      this.request<CountDto, void>({
        path: `/widgetSlotAssignments/bulk-create`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),
  };
  projectDetails = {
    /**
     * No description
     *
     * @name ProjectDetailControllerGetProjectDetail
     * @request GET:/projectDetails/detail/{id}
     */
    getProjectDetail: (id: string, params: RequestParams = {}) =>
      this.request<ProjectDetailResponseDto, unknown>({
        path: `/projectDetails/detail/${id}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name ProjectDetailControllerGetProjectDetails
     * @request GET:/projectDetails
     */
    getProjectDetails: (
      query?: {
        skip?: number;
        take?: number;
        orderBy?: string;
        filter?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ProjectDetailResponseDto[], unknown>({
        path: `/projectDetails`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name ProjectDetailControllerCreateProjectDetail
     * @request POST:/projectDetails
     */
    createProjectDetail: (
      data: ProjectDetailCreateDto,
      params: RequestParams = {},
    ) =>
      this.request<ProjectDetailResponseDto, unknown>({
        path: `/projectDetails`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name ProjectDetailControllerUpdateProjectDetail
     * @request PATCH:/projectDetails/{id}
     */
    updateProjectDetail: (
      id: string,
      data: ProjectDetailUpdateDto,
      params: RequestParams = {},
    ) =>
      this.request<ProjectDetailResponseDto, unknown>({
        path: `/projectDetails/${id}`,
        method: 'PATCH',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name ProjectDetailControllerDeleteProjectDetail
     * @request DELETE:/projectDetails/{id}
     */
    deleteProjectDetail: (id: string, params: RequestParams = {}) =>
      this.request<ProjectDetailResponseDto, unknown>({
        path: `/projectDetails/${id}`,
        method: 'DELETE',
        format: 'json',
        ...params,
      }),
  };
  viewProjects = {
    /**
     * No description
     *
     * @name ViewProjectControllerGetViewProject
     * @request GET:/viewProjects/detail/{id}
     */
    getViewProject: (id: string, params: RequestParams = {}) =>
      this.request<ViewProjectResponseDto, unknown>({
        path: `/viewProjects/detail/${id}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name ViewProjectControllerGetViewProjects
     * @request GET:/viewProjects
     */
    getViewProjects: (
      query?: {
        skip?: number;
        take?: number;
        orderBy?: string;
        filter?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ViewProjectResponseDto[], unknown>({
        path: `/viewProjects`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name ViewProjectControllerCreateViewProject
     * @request POST:/viewProjects
     */
    createViewProject: (
      data: ViewProjectCreateDto,
      params: RequestParams = {},
    ) =>
      this.request<ViewProjectResponseDto, unknown>({
        path: `/viewProjects`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name ViewProjectControllerUpdateViewProject
     * @request PATCH:/viewProjects/{id}
     */
    updateViewProject: (
      id: string,
      data: ViewProjectUpdateDto,
      params: RequestParams = {},
    ) =>
      this.request<ViewProjectResponseDto, unknown>({
        path: `/viewProjects/${id}`,
        method: 'PATCH',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name ViewProjectControllerDeleteViewProject
     * @request DELETE:/viewProjects/{id}
     */
    deleteViewProject: (id: string, params: RequestParams = {}) =>
      this.request<ViewProjectResponseDto, unknown>({
        path: `/viewProjects/${id}`,
        method: 'DELETE',
        format: 'json',
        ...params,
      }),
  };
  dataTableProjects = {
    /**
     * No description
     *
     * @name DataTableProjectControllerGetDataTableProject
     * @request GET:/dataTableProjects/detail/{id}
     */
    getDataTableProject: (id: string, params: RequestParams = {}) =>
      this.request<DataTableProjectResponseDto, unknown>({
        path: `/dataTableProjects/detail/${id}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name DataTableProjectControllerGetDataTableProjects
     * @request GET:/dataTableProjects
     */
    getDataTableProjects: (
      query?: {
        skip?: number;
        take?: number;
        orderBy?: string;
        filter?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<DataTableProjectResponseDto[], unknown>({
        path: `/dataTableProjects`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name DataTableProjectControllerCreateDataTableProject
     * @request POST:/dataTableProjects
     */
    createDataTableProject: (
      data: DataTableProjectCreateDto,
      params: RequestParams = {},
    ) =>
      this.request<DataTableProjectResponseDto, unknown>({
        path: `/dataTableProjects`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name DataTableProjectControllerUpdateDataTableProject
     * @request PATCH:/dataTableProjects/{id}
     */
    updateDataTableProject: (
      id: string,
      data: DataTableProjectUpdateDto,
      params: RequestParams = {},
    ) =>
      this.request<DataTableProjectResponseDto, unknown>({
        path: `/dataTableProjects/${id}`,
        method: 'PATCH',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name DataTableProjectControllerDeleteDataTableProject
     * @request DELETE:/dataTableProjects/{id}
     */
    deleteDataTableProject: (id: string, params: RequestParams = {}) =>
      this.request<DataTableProjectResponseDto, unknown>({
        path: `/dataTableProjects/${id}`,
        method: 'DELETE',
        format: 'json',
        ...params,
      }),
  };
  bluemapProjects = {
    /**
     * No description
     *
     * @name BluemapProjectControllerGetBluemapProject
     * @request GET:/bluemapProjects/detail/{id}
     */
    getBluemapProject: (id: string, params: RequestParams = {}) =>
      this.request<BluemapProjectResponseDto, unknown>({
        path: `/bluemapProjects/detail/${id}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name BluemapProjectControllerGetBluemapProjects
     * @request GET:/bluemapProjects
     */
    getBluemapProjects: (
      query?: {
        skip?: number;
        take?: number;
        orderBy?: string;
        filter?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<BluemapProjectResponseDto[], unknown>({
        path: `/bluemapProjects`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name BluemapProjectControllerCreateBluemapProject
     * @request POST:/bluemapProjects
     */
    createBluemapProject: (
      data: BluemapProjectCreateDto,
      params: RequestParams = {},
    ) =>
      this.request<BluemapProjectResponseDto, unknown>({
        path: `/bluemapProjects`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name BluemapProjectControllerUpdateBluemapProject
     * @request PATCH:/bluemapProjects/{id}
     */
    updateBluemapProject: (
      id: string,
      data: BluemapProjectUpdateDto,
      params: RequestParams = {},
    ) =>
      this.request<BluemapProjectResponseDto, unknown>({
        path: `/bluemapProjects/${id}`,
        method: 'PATCH',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name BluemapProjectControllerDeleteBluemapProject
     * @request DELETE:/bluemapProjects/{id}
     */
    deleteBluemapProject: (id: string, params: RequestParams = {}) =>
      this.request<BluemapProjectResponseDto, unknown>({
        path: `/bluemapProjects/${id}`,
        method: 'DELETE',
        format: 'json',
        ...params,
      }),
  };
  widgetLibs = {
    /**
     * No description
     *
     * @name WidgetLibControllerGetWidgetLib
     * @request GET:/widgetLibs/detail/{id}
     */
    getWidgetLib: (id: string, params: RequestParams = {}) =>
      this.request<WidgetLibResponseDto, unknown>({
        path: `/widgetLibs/detail/${id}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name WidgetLibControllerGetWidgetLibs
     * @request GET:/widgetLibs
     */
    getWidgetLibs: (
      query?: {
        skip?: number;
        take?: number;
        orderBy?: string;
        filter?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<WidgetLibResponseDto[], unknown>({
        path: `/widgetLibs`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name WidgetLibControllerCreateWidgetLib
     * @request POST:/widgetLibs
     */
    createWidgetLib: (data: WidgetLibCreateDto, params: RequestParams = {}) =>
      this.request<WidgetLibResponseDto, unknown>({
        path: `/widgetLibs`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name WidgetLibControllerUpdateWidgetLib
     * @request PATCH:/widgetLibs/{id}
     */
    updateWidgetLib: (
      id: string,
      data: WidgetLibUpdateDto,
      params: RequestParams = {},
    ) =>
      this.request<WidgetLibResponseDto, unknown>({
        path: `/widgetLibs/${id}`,
        method: 'PATCH',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name WidgetLibControllerDeleteWidgetLib
     * @request DELETE:/widgetLibs/{id}
     */
    deleteWidgetLib: (id: string, params: RequestParams = {}) =>
      this.request<WidgetLibResponseDto, unknown>({
        path: `/widgetLibs/${id}`,
        method: 'DELETE',
        format: 'json',
        ...params,
      }),
  };
}
