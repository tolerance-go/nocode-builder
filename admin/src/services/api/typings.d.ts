declare namespace API {
  type LoginDto = {
    username: string;
    password: string;
  };

  type LoginResponseDto = {
    accessToken: string;
  };

  type ProjectControllerDeleteProjectParams = {
    id: string;
  };

  type ProjectControllerGetProjectParams = {
    id: string;
  };

  type ProjectControllerGetProjectsParams = {
    skip: string;
    take: string;
    cursor: string;
  };

  type ProjectControllerUpdateProjectParams = {
    id: string;
  };

  type ProjectGroupControllerDeleteProjectGroupParams = {
    id: string;
  };

  type ProjectGroupControllerGetProjectGroupParams = {
    id: string;
  };

  type ProjectGroupControllerGetProjectGroupsParams = {
    /** Number of records to skip for pagination */
    skip?: number;
    /** Number of records to take for pagination */
    take?: number;
    /** Field by which to order the results */
    orderBy?: string;
    /** Filter condition */
    filter?: string;
  };

  type ProjectGroupControllerUpdateProjectGroupParams = {
    id: string;
  };

  type ProjectGroupCreateDto = {
    name: string;
    parentGroupId?: number;
    ownerId: number;
    createdAt?: string;
    updatedAt?: string;
  };

  type ProjectGroupDto = {
    /** The unique identifier of the project group */
    id: number;
    /** The name of the project group */
    name: string;
    /** The parent group ID of the project group */
    parentGroupId?: Record<string, any>;
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
    /** The last update date of the project group record */
    updatedAt?: string;
  };

  type UserControllerDeleteUserParams = {
    id: string;
  };

  type UserControllerGetUserParams = {
    id: string;
  };

  type UserControllerGetUsersParams = {
    /** Number of records to skip for pagination */
    skip?: number;
    /** Number of records to take for pagination */
    take?: number;
    /** Field by which to order the results */
    orderBy?: string;
    /** Filter condition */
    filter?: string;
  };

  type UserControllerUpdateUserParams = {
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
    email?: Record<string, any>;
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
