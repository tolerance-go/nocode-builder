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
import { OptionalKeys } from '@/utils';

export type UserModelInsertType = OptionalKeys<
  UserModel,
  'id' | 'updatedAt' | 'createdAt'
>;
export type ProjectModelInsertType = OptionalKeys<
  ProjectModel,
  'id' | 'updatedAt' | 'createdAt'
>;
export type ProjectGroupModelInsertType = OptionalKeys<
  ProjectGroupModel,
  'id' | 'updatedAt' | 'createdAt'
>;
export type TimeChunkModelInsertType = OptionalKeys<
  TimeChunkModel,
  'id' | 'updatedAt' | 'createdAt'
>;
export type TimeNodeModelInsertType = OptionalKeys<
  TimeNodeModel,
  'id' | 'updatedAt' | 'createdAt'
>;
export type ProjectOperationModelInsertType = OptionalKeys<
  ProjectOperationModel,
  'id'
>;
export type ProjectGroupOperationModelInsertType = OptionalKeys<
  ProjectGroupOperationModel,
  'id'
>;
export type ProjectCreateOperationModelInsertType = OptionalKeys<
  ProjectCreateOperationModel,
  'id' | 'updatedAt' | 'createdAt'
>;
export type ProjectUpdateOperationModelInsertType = OptionalKeys<
  ProjectUpdateOperationModel,
  'id' | 'updatedAt' | 'createdAt'
>;
export type ProjectDeleteOperationModelInsertType = OptionalKeys<
  ProjectDeleteOperationModel,
  'id' | 'updatedAt' | 'createdAt'
>;
export type ProjectGroupCreateOperationModelInsertType = OptionalKeys<
  ProjectGroupCreateOperationModel,
  'id' | 'updatedAt' | 'createdAt'
>;
export type ProjectGroupUpdateOperationModelInsertType = OptionalKeys<
  ProjectGroupUpdateOperationModel,
  'id' | 'updatedAt' | 'createdAt'
>;
export type ProjectGroupDeleteOperationModelInsertType = OptionalKeys<
  ProjectGroupDeleteOperationModel,
  'id' | 'updatedAt' | 'createdAt'
>;

export class Database extends Dexie {
  users: Table<UserModel, number, UserModelInsertType>;
  projects: Table<ProjectModel, number, ProjectModelInsertType>;
  projectGroups: Table<ProjectGroupModel, number, ProjectGroupModelInsertType>;
  timeChunks: Table<TimeChunkModel, number, TimeChunkModelInsertType>;
  timeNodes: Table<TimeNodeModel, number, TimeNodeModelInsertType>;
  projectOperations: Table<
    ProjectOperationModel,
    number,
    ProjectOperationModelInsertType
  >;
  projectGroupOperations: Table<
    ProjectGroupOperationModel,
    number,
    ProjectGroupOperationModelInsertType
  >;
  projectCreateOperations: Table<
    ProjectCreateOperationModel,
    number,
    ProjectCreateOperationModelInsertType
  >;
  projectUpdateOperations: Table<
    ProjectUpdateOperationModel,
    number,
    ProjectUpdateOperationModelInsertType
  >;
  projectDeleteOperations: Table<
    ProjectDeleteOperationModel,
    number,
    ProjectDeleteOperationModelInsertType
  >;
  projectGroupCreateOperations: Table<
    ProjectGroupCreateOperationModel,
    number,
    ProjectGroupCreateOperationModelInsertType
  >;
  projectGroupUpdateOperations: Table<
    ProjectGroupUpdateOperationModel,
    number,
    ProjectGroupUpdateOperationModelInsertType
  >;
  projectGroupDeleteOperations: Table<
    ProjectGroupDeleteOperationModel,
    number,
    ProjectGroupDeleteOperationModelInsertType
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
