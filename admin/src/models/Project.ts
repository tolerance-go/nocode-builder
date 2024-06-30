import { User } from './User';
import { ProjectGroup } from './ProjectGroup';
import { ProjectOperation } from './ProjectOperation';

export class Project {
  id: number;
  name: string;
  ownerId: number;
  owner: User;
  createdAt: Date;
  updatedAt: Date;
  projectGroup?: ProjectGroup;
  projectGroupId?: number;
  operations: ProjectOperation[];

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
    owner: User;
    createdAt: Date;
    updatedAt: Date;
    projectGroup?: ProjectGroup;
    projectGroupId?: number;
    operations: ProjectOperation[];
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
