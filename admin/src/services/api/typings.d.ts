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
    skip: string;
    take: string;
    cursor: string;
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
}
