declare namespace API {
  type deleteProjectGroupParams = {
    id: string;
  };

  type deleteProjectParams = {
    id: string;
  };

  type deleteUserParams = {
    id: string;
  };

  type getProjectGroupParams = {
    id: string;
  };

  type getProjectGroupsParams = {
    /** Number of records to skip for pagination */
    skip?: number;
    /** Number of records to take for pagination */
    take?: number;
    /** Field by which to order the results */
    orderBy?: string;
    /** Filter condition */
    filter?: string;
  };

  type getProjectParams = {
    id: string;
  };

  type getProjectsParams = {
    /** Number of records to skip for pagination */
    skip?: number;
    /** Number of records to take for pagination */
    take?: number;
    /** Field by which to order the results */
    orderBy?: string;
    /** Filter condition */
    filter?: string;
  };

  type getUserParams = {
    id: string;
  };

  type getUsersParams = {
    /** Number of records to skip for pagination */
    skip?: number;
    /** Number of records to take for pagination */
    take?: number;
    /** Field by which to order the results */
    orderBy?: string;
    /** Filter condition */
    filter?: string;
  };

  type LoginDto = {
    username: string;
    password: string;
  };

  type LoginResponseDto = {
    accessToken: string;
  };

  type ProjectCreateDto = {
    name: string;
    projectGroupId?: number;
    createdAt?: string;
    updatedAt?: string;
  };

  type ProjectDto = {
    /** The unique identifier of the project */
    id: number;
    /** The name of the project */
    name: string;
    /** The project group ID of the project */
    projectGroupId?: Record<string, unknown>;
    /** The owner ID of the project */
    ownerId: number;
    /** The date and time when the project was created */
    createdAt: string;
    /** The date and time when the project was last updated */
    updatedAt: string;
  };

  type ProjectGroupCreateDto = {
    name: string;
    parentGroupId?: number;
    createdAt?: string;
    updatedAt?: string;
  };

  type ProjectGroupDto = {
    /** The unique identifier of the project group */
    id: number;
    /** The name of the project group */
    name: string;
    /** The parent group ID of the project group */
    parentGroupId?: Record<string, unknown>;
    /** The owner ID of the project group */
    ownerId: number;
    /** The date and time when the project group was created */
    createdAt: string;
    /** The date and time when the project group was last updated */
    updatedAt: string;
  };

  type ProjectGroupUpdateDto = {
    /** The name of the project group */
    name?: string;
    /** The parent group ID of the project group */
    parentGroupId?: number;
  };

  type ProjectUpdateDto = {
    /** The name of the project */
    name?: string;
    /** The project group ID of the project */
    projectGroupId?: number;
  };

  type updateProjectGroupParams = {
    id: string;
  };

  type updateProjectParams = {
    id: string;
  };

  type updateUserParams = {
    id: string;
  };

  type UserCreateDto = {
    name: string;
    email?: string;
    password: string;
    createdAt?: string;
    updatedAt?: string;
  };

  type UserDto = {
    /** The unique identifier of the user */
    id: number;
    /** The name of the user */
    name: string;
    /** The email address of the user */
    email?: Record<string, unknown>;
    /** The date and time when the user was created */
    createdAt: string;
    /** The date and time when the user was last updated */
    updatedAt: string;
  };

  type UserUpdateDto = {
    /** The name of the user */
    name?: string;
    /** The email address of the user */
    email?: string;
    /** The password for the user */
    password?: string;
    /** The last update date of the user record */
    updatedAt?: string;
  };
}
