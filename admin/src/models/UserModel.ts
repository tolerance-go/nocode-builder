import { ProjectModel } from './ProjectModel';
import { ProjectGroupModel } from './ProjectGroupModel';
import { TimeChunkModel } from './TimeChunkModel';

export class UserModel {
  id: number;
  name: string;
  email?: string;
  password: string;
  projects: ProjectModel[];
  createdAt: Date;
  updatedAt: Date;
  projectGroups: ProjectGroupModel[];
  timeChunk: TimeChunkModel[];

  constructor({
    id,
    name,
    email,
    password,
    projects,
    createdAt,
    updatedAt,
    projectGroups,
    timeChunk
  }: {
    id: number;
    name: string;
    email?: string;
    password: string;
    projects: ProjectModel[];
    createdAt: Date;
    updatedAt: Date;
    projectGroups: ProjectGroupModel[];
    timeChunk: TimeChunkModel[];
  }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.projects = projects;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.projectGroups = projectGroups;
    this.timeChunk = timeChunk;
  }
}
