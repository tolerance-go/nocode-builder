import { User } from './User';
import { Project } from './Project';
import { ProjectGroupOperation } from './ProjectGroupOperation';

export class ProjectGroup {
  id: number;
  name: string;
  parentGroupId?: number;
  parentGroup?: ProjectGroup;
  childGroups: ProjectGroup[];
  ownerId: number;
  owner: User;
  projects: Project[];
  createdAt: Date;
  updatedAt: Date;
  operations: ProjectGroupOperation[];

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
    operations
  }: {
    id: number;
    name: string;
    parentGroupId?: number;
    parentGroup?: ProjectGroup;
    childGroups: ProjectGroup[];
    ownerId: number;
    owner: User;
    projects: Project[];
    createdAt: Date;
    updatedAt: Date;
    operations: ProjectGroupOperation[];
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
