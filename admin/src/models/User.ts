import { Project } from './Project';
import { ProjectGroup } from './ProjectGroup';
import { TimeChunk } from './TimeChunk';

export class User {
  id: number;
  name: string;
  email?: string;
  password: string;
  projects: Project[];
  createdAt: Date;
  updatedAt: Date;
  projectGroups: ProjectGroup[];
  timeChunk: TimeChunk[];

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
    projects: Project[];
    createdAt: Date;
    updatedAt: Date;
    projectGroups: ProjectGroup[];
    timeChunk: TimeChunk[];
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
