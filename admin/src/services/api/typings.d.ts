declare namespace API {
  type LoginDto = {
    username: string;
    password: string;
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
