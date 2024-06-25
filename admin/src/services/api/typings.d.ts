declare namespace API {
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
    skip?: number;
    take?: number;
    orderBy?: string;
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
    id: number;
    name: string;
    email?: Record<string, any>;
    createdAt: string;
    updatedAt: string;
  };

  type UserUpdateDto = {
    name?: string;
    email?: string;
    password?: string;
    updatedAt?: string;
  };
}
