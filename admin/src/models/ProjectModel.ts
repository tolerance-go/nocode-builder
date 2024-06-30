import { UserModel } from './UserModel';
import { ProjectGroupModel } from './ProjectGroupModel';
import { ProjectOperationModel } from './ProjectOperationModel';

export class ProjectModel {
  id: number;
  name: string;
  ownerId: number;
  owner: UserModel;
  createdAt: Date;
  updatedAt: Date;
  projectGroup?: ProjectGroupModel;
  projectGroupId?: number;
  operations: ProjectOperationModel[];

  constructor({
    id,
    name,
    ownerId,
    owner,
    createdAt,
    updatedAt,
    projectGroup,
    projectGroupId,
    operations
  }: {
    id: number;
    name: string;
    ownerId: number;
    owner: UserModel;
    createdAt: Date;
    updatedAt: Date;
    projectGroup?: ProjectGroupModel;
    projectGroupId?: number;
    operations: ProjectOperationModel[];
  }) {
    this.id = id;
    this.name = name;
    this.ownerId = ownerId;
    this.owner = owner;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.projectGroup = projectGroup;
    this.projectGroupId = projectGroupId;
    this.operations = operations;
  }
}
