/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED        ##
 * ---------------------------------------------------------------
 */

import {
  UserModel,
  ProjectModel,
  ProjectGroupModel,
  TimeChunkModel,
  TimeNodeModel,
  ProjectOperationModel,
  ProjectGroupOperationModel,
  ProjectCreateOperationModel,
  ProjectUpdateOperationModel,
  ProjectDeleteOperationModel,
  ProjectGroupCreateOperationModel,
  ProjectGroupUpdateOperationModel,
  ProjectGroupDeleteOperationModel,
} from '@/_gen/models';
import Dexie, { Table } from 'dexie';

export class Database extends Dexie {
  users: Table<
    UserModel,
    number,
    Omit<UserModel, 'id' | 'updatedAt' | 'createdAt'>
  >;
  projects: Table<
    ProjectModel,
    number,
    Omit<ProjectModel, 'id' | 'updatedAt' | 'createdAt'>
  >;
  projectGroups: Table<
    ProjectGroupModel,
    number,
    Omit<ProjectGroupModel, 'id' | 'updatedAt' | 'createdAt'>
  >;
  timeChunks: Table<
    TimeChunkModel,
    number,
    Omit<TimeChunkModel, 'id' | 'updatedAt' | 'createdAt'>
  >;
  timeNodes: Table<
    TimeNodeModel,
    number,
    Omit<TimeNodeModel, 'id' | 'updatedAt' | 'createdAt'>
  >;
  projectOperations: Table<
    ProjectOperationModel,
    number,
    Omit<ProjectOperationModel, 'id'>
  >;
  projectGroupOperations: Table<
    ProjectGroupOperationModel,
    number,
    Omit<ProjectGroupOperationModel, 'id'>
  >;
  projectCreateOperations: Table<
    ProjectCreateOperationModel,
    number,
    Omit<ProjectCreateOperationModel, 'id' | 'updatedAt' | 'createdAt'>
  >;
  projectUpdateOperations: Table<
    ProjectUpdateOperationModel,
    number,
    Omit<ProjectUpdateOperationModel, 'id' | 'updatedAt' | 'createdAt'>
  >;
  projectDeleteOperations: Table<
    ProjectDeleteOperationModel,
    number,
    Omit<ProjectDeleteOperationModel, 'id' | 'updatedAt' | 'createdAt'>
  >;
  projectGroupCreateOperations: Table<
    ProjectGroupCreateOperationModel,
    number,
    Omit<ProjectGroupCreateOperationModel, 'id' | 'updatedAt' | 'createdAt'>
  >;
  projectGroupUpdateOperations: Table<
    ProjectGroupUpdateOperationModel,
    number,
    Omit<ProjectGroupUpdateOperationModel, 'id' | 'updatedAt' | 'createdAt'>
  >;
  projectGroupDeleteOperations: Table<
    ProjectGroupDeleteOperationModel,
    number,
    Omit<ProjectGroupDeleteOperationModel, 'id' | 'updatedAt' | 'createdAt'>
  >;

  constructor() {
    super('database');
    this.version(1).stores({
      users: '++id, name, email, password, createdAt, updatedAt',
      projects: '++id, name, ownerId, createdAt, updatedAt, projectGroupId',
      projectGroups: '++id, name, parentGroupId, ownerId, createdAt, updatedAt',
      timeChunks: '++id, name, description, userId, createdAt, updatedAt',
      timeNodes:
        '++id, timeChunkId, projectOperationId, projectGroupOperationId, createdAt, updatedAt',
      projectOperations:
        '++id, projectId, projectCreateOperationId, projectUpdateOperationId, projectDeleteOperationId',
      projectGroupOperations:
        '++id, projectGroupId, projectGroupCreateOperationId, projectGroupUpdateOperationId, projectGroupDeleteOperationId',
      projectCreateOperations:
        '++id, recordId, createdAt, updatedAt, projectOperationId',
      projectUpdateOperations:
        '++id, recordId, createdAt, updatedAt, projectOperationId',
      projectDeleteOperations:
        '++id, recordId, createdAt, updatedAt, projectOperationId',
      projectGroupCreateOperations:
        '++id, recordId, createdAt, updatedAt, projectGroupOperationId',
      projectGroupUpdateOperations:
        '++id, recordId, createdAt, updatedAt, projectGroupOperationId',
      projectGroupDeleteOperations:
        '++id, recordId, createdAt, updatedAt, projectGroupOperationId',
    });

    this.users = this.table('users');
    this.projects = this.table('projects');
    this.projectGroups = this.table('projectGroups');
    this.timeChunks = this.table('timeChunks');
    this.timeNodes = this.table('timeNodes');
    this.projectOperations = this.table('projectOperations');
    this.projectGroupOperations = this.table('projectGroupOperations');
    this.projectCreateOperations = this.table('projectCreateOperations');
    this.projectUpdateOperations = this.table('projectUpdateOperations');
    this.projectDeleteOperations = this.table('projectDeleteOperations');
    this.projectGroupCreateOperations = this.table(
      'projectGroupCreateOperations',
    );
    this.projectGroupUpdateOperations = this.table(
      'projectGroupUpdateOperations',
    );
    this.projectGroupDeleteOperations = this.table(
      'projectGroupDeleteOperations',
    );
  }
}

export const db = new Database();
