import { UserModel } from './UserModel';
import { ProjectModel } from './ProjectModel';
import { ProjectGroupOperationModel } from './ProjectGroupOperationModel';

export class ProjectGroupModel {
  id: number;
  name: string;
  parentGroupId?: number;
  parentGroup?: ProjectGroupModel;
  childGroups: ProjectGroupModel[];
  ownerId: number;
  owner: UserModel;
  projects: ProjectModel[];
  createdAt: Date;
  updatedAt: Date;
  operations: ProjectGroupOperationModel[];

  constructor({
    id,
    name,
    parentGroupId,
    parentGroup,
    childGroups,
    ownerId,
    owner,
    projects,
    createdAt,
    updatedAt,
    operations,
  }: {
    id: number;
    name: string;
    parentGroupId?: number;
    parentGroup?: ProjectGroupModel;
    childGroups: ProjectGroupModel[];
    ownerId: number;
    owner: UserModel;
    projects: ProjectModel[];
    createdAt: Date;
    updatedAt: Date;
    operations: ProjectGroupOperationModel[];
  }) {
    this.id = id;
    this.name = name;
    this.parentGroupId = parentGroupId;
    this.parentGroup = parentGroup;
    this.childGroups = childGroups;
    this.ownerId = ownerId;
    this.owner = owner;
    this.projects = projects;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.operations = operations;
  }
}
