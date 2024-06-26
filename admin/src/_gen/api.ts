/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED        ##
 * ---------------------------------------------------------------
 */

export interface LoginDto {
  username: string;
  password: string;
}

export interface LoginResponseDto {
  accessToken: string;
}

export interface UserResponseDto {
  id: number;
  name: string;
  email?: string;
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
  /**
   * The email address of the user
   * @example "johndoe@example.com"
   */
  email?: string;
  /**
   * The password for the user
   * @example "P@ssw0rd!"
   */
  password?: string;
  /**
   * The last update date of the user record
   * @example "2024-01-02T00:00:00Z"
   */
  updatedAt?: string;
}

export interface ProjectDto {
  /**
   * The unique identifier of the project
   * @example 1
   */
  id: number;
  /**
   * The name of the project
   * @example "Project 1"
   */
  name: string;
  /**
   * The project group ID of the project
   * @example 1
   */
  projectGroupId?: number | null;
  /**
   * The owner ID of the project
   * @example 1
   */
  ownerId: number;
  /**
   * The date and time when the project was created
   * @example "2024-01-01T00:00:00Z"
   */
  createdAt: string;
  /**
   * The date and time when the project was last updated
   * @example "2024-01-02T00:00:00Z"
   */
  updatedAt: string;
}

export interface ProjectCreateDto {
  name: string;
  projectGroupId?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProjectUpdateDto {
  /**
   * The name of the project
   * @example "Project 1"
   */
  name?: string;
  /**
   * The project group ID of the project
   * @example 1
   */
  projectGroupId?: number;
}

export interface ProjectGroupDto {
  /**
   * The unique identifier of the project group
   * @example 1
   */
  id: number;
  /**
   * The name of the project group
   * @example "Project Group 1"
   */
  name: string;
  /**
   * The parent group ID of the project group
   * @example 1
   */
  parentGroupId?: number | null;
  /**
   * The owner ID of the project group
   * @example 1
   */
  ownerId: number;
  /**
   * The date and time when the project group was created
   * @example "2024-01-01T00:00:00Z"
   */
  createdAt: string;
  /**
   * The date and time when the project group was last updated
   * @example "2024-01-02T00:00:00Z"
   */
  updatedAt: string;
}

export interface ProjectGroupCreateDto {
  name: string;
  parentGroupId?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProjectGroupUpdateDto {
  /**
   * The name of the project group
   * @example "Project Group 1"
   */
  name?: string;
  /**
   * The parent group ID of the project group
   * @example 1
   */
  parentGroupId?: number;
}

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
  };
  users = {
    /**
     * No description
     *
     * @name UserControllerGetUser
     * @request GET:/users/{id}
     */
    getUser: (id: string, params: RequestParams = {}) =>
      this.request<UserResponseDto, unknown>({
        path: `/users/${id}`,
        method: 'GET',
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
  };
  projects = {
    /**
     * No description
     *
     * @name ProjectControllerGetProject
     * @request GET:/projects/{id}
     */
    getProject: (id: string, params: RequestParams = {}) =>
      this.request<ProjectDto, unknown>({
        path: `/projects/${id}`,
        method: 'GET',
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
      this.request<ProjectDto, unknown>({
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
      this.request<ProjectDto, unknown>({
        path: `/projects/${id}`,
        method: 'DELETE',
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
        /**
         * Number of records to skip for pagination
         * @example 0
         */
        skip?: number;
        /**
         * Number of records to take for pagination
         * @example 10
         */
        take?: number;
        /**
         * Field by which to order the results
         * @example "createdAt"
         */
        orderBy?: string;
        /**
         * Filter condition
         * @example "Project 1"
         */
        filter?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ProjectDto[], unknown>({
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
      this.request<ProjectDto, void>({
        path: `/projects`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),
  };
  projectGroups = {
    /**
     * No description
     *
     * @name ProjectGroupControllerGetProjectGroup
     * @request GET:/project-groups/{id}
     */
    getProjectGroup: (id: string, params: RequestParams = {}) =>
      this.request<ProjectGroupDto, unknown>({
        path: `/project-groups/${id}`,
        method: 'GET',
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
      this.request<ProjectGroupDto, unknown>({
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
      this.request<ProjectGroupDto, unknown>({
        path: `/project-groups/${id}`,
        method: 'DELETE',
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
        /**
         * Number of records to skip for pagination
         * @example 0
         */
        skip?: number;
        /**
         * Number of records to take for pagination
         * @example 10
         */
        take?: number;
        /**
         * Field by which to order the results
         * @example "createdAt"
         */
        orderBy?: string;
        /**
         * Filter condition
         * @example "Project Group 1"
         */
        filter?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ProjectGroupDto[], unknown>({
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
      this.request<ProjectGroupDto, void>({
        path: `/project-groups`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),
  };
}
