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
  users: Table<UserModel, number>;
  projects: Table<ProjectModel, number>;
  projectgroups: Table<ProjectGroupModel, number>;
  timechunks: Table<TimeChunkModel, number>;
  timenodes: Table<TimeNodeModel, number>;
  projectoperations: Table<ProjectOperationModel, number>;
  projectgroupoperations: Table<ProjectGroupOperationModel, number>;
  projectcreateoperations: Table<ProjectCreateOperationModel, number>;
  projectupdateoperations: Table<ProjectUpdateOperationModel, number>;
  projectdeleteoperations: Table<ProjectDeleteOperationModel, number>;
  projectgroupcreateoperations: Table<ProjectGroupCreateOperationModel, number>;
  projectgroupupdateoperations: Table<ProjectGroupUpdateOperationModel, number>;
  projectgroupdeleteoperations: Table<ProjectGroupDeleteOperationModel, number>;

  constructor() {
    super("database");
    this.version(1).stores({
      users:
        "++id, name, email, password, projects, createdAt, updatedAt, projectGroups, timeChunk",
      projects:
        "++id, name, ownerId, owner, createdAt, updatedAt, projectGroup, projectGroupId, operations",
      projectgroups:
        "++id, name, parentGroupId, parentGroup, childGroups, ownerId, owner, projects, createdAt, updatedAt, operations",
      timechunks:
        "++id, name, description, userId, user, timeNodes, createdAt, updatedAt",
      timenodes:
        "++id, timeChunkId, timeChunk, projectOperationId, projectOperation, projectGroupOperationId, ProjectGroupOperation, createdAt, updatedAt",
      projectoperations:
        "++id, projectId, project, projectCreateOperationId, projectUpdateOperationId, projectDeleteOperationId, timeNode, projectUpdateOperation, projectDeleteOperation, projectCreateOperation",
      projectgroupoperations:
        "++id, projectGroupId, projectGroup, projectGroupCreateOperationId, projectGroupUpdateOperationId, projectGroupDeleteOperationId, timeNode, projectGroupCreateOperation, projectGroupUpdateOperation, projectGroupDeleteOperation",
      projectcreateoperations:
        "++id, recordId, createdAt, updatedAt, projectOperation, projectOperationId",
      projectupdateoperations:
        "++id, recordId, createdAt, updatedAt, projectOperation, projectOperationId",
      projectdeleteoperations:
        "++id, recordId, createdAt, updatedAt, projectOperation, projectOperationId",
      projectgroupcreateoperations:
        "++id, recordId, createdAt, updatedAt, projectGroupOperation, projectGroupOperationId",
      projectgroupupdateoperations:
        "++id, recordId, createdAt, updatedAt, projectGroupOperation, projectGroupOperationId",
      projectgroupdeleteoperations:
        "++id, recordId, createdAt, updatedAt, projectGroupOperation, projectGroupOperationId",
    });

    this.users = this.table("users");
    this.projects = this.table("projects");
    this.projectgroups = this.table("projectgroups");
    this.timechunks = this.table("timechunks");
    this.timenodes = this.table("timenodes");
    this.projectoperations = this.table("projectoperations");
    this.projectgroupoperations = this.table("projectgroupoperations");
    this.projectcreateoperations = this.table("projectcreateoperations");
    this.projectupdateoperations = this.table("projectupdateoperations");
    this.projectdeleteoperations = this.table("projectdeleteoperations");
    this.projectgroupcreateoperations = this.table(
      "projectgroupcreateoperations",
    );
    this.projectgroupupdateoperations = this.table(
      "projectgroupupdateoperations",
    );
    this.projectgroupdeleteoperations = this.table(
      "projectgroupdeleteoperations",
    );
  }
}

export const db = new Database();
