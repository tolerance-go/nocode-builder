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
} from "@/_gen/models";
import Dexie, { Table } from "dexie";

export class Database extends Dexie {
  users: Table<UserModel, number>;
  projects: Table<ProjectModel, number>;
  projectGroups: Table<ProjectGroupModel, number>;
  timeChunks: Table<TimeChunkModel, number>;
  timeNodes: Table<TimeNodeModel, number>;
  projectOperations: Table<ProjectOperationModel, number>;
  projectGroupOperations: Table<ProjectGroupOperationModel, number>;
  projectCreateOperations: Table<ProjectCreateOperationModel, number>;
  projectUpdateOperations: Table<ProjectUpdateOperationModel, number>;
  projectDeleteOperations: Table<ProjectDeleteOperationModel, number>;
  projectGroupCreateOperations: Table<ProjectGroupCreateOperationModel, number>;
  projectGroupUpdateOperations: Table<ProjectGroupUpdateOperationModel, number>;
  projectGroupDeleteOperations: Table<ProjectGroupDeleteOperationModel, number>;

  constructor() {
    super("database");
    this.version(1).stores({
      users:
        "++id, name, email, password, projects, createdAt, updatedAt, projectGroups, timeChunk",
      projects:
        "++id, name, ownerId, owner, createdAt, updatedAt, projectGroup, projectGroupId, operations",
      projectGroups:
        "++id, name, parentGroupId, parentGroup, childGroups, ownerId, owner, projects, createdAt, updatedAt, operations",
      timeChunks:
        "++id, name, description, userId, user, timeNodes, createdAt, updatedAt",
      timeNodes:
        "++id, timeChunkId, timeChunk, projectOperationId, projectOperation, projectGroupOperationId, ProjectGroupOperation, createdAt, updatedAt",
      projectOperations:
        "++id, projectId, project, projectCreateOperationId, projectUpdateOperationId, projectDeleteOperationId, timeNode, projectUpdateOperation, projectDeleteOperation, projectCreateOperation",
      projectGroupOperations:
        "++id, projectGroupId, projectGroup, projectGroupCreateOperationId, projectGroupUpdateOperationId, projectGroupDeleteOperationId, timeNode, projectGroupCreateOperation, projectGroupUpdateOperation, projectGroupDeleteOperation",
      projectCreateOperations:
        "++id, recordId, createdAt, updatedAt, projectOperation, projectOperationId",
      projectUpdateOperations:
        "++id, recordId, createdAt, updatedAt, projectOperation, projectOperationId",
      projectDeleteOperations:
        "++id, recordId, createdAt, updatedAt, projectOperation, projectOperationId",
      projectGroupCreateOperations:
        "++id, recordId, createdAt, updatedAt, projectGroupOperation, projectGroupOperationId",
      projectGroupUpdateOperations:
        "++id, recordId, createdAt, updatedAt, projectGroupOperation, projectGroupOperationId",
      projectGroupDeleteOperations:
        "++id, recordId, createdAt, updatedAt, projectGroupOperation, projectGroupOperationId",
    });

    this.users = this.table("users");
    this.projects = this.table("projects");
    this.projectGroups = this.table("projectGroups");
    this.timeChunks = this.table("timeChunks");
    this.timeNodes = this.table("timeNodes");
    this.projectOperations = this.table("projectOperations");
    this.projectGroupOperations = this.table("projectGroupOperations");
    this.projectCreateOperations = this.table("projectCreateOperations");
    this.projectUpdateOperations = this.table("projectUpdateOperations");
    this.projectDeleteOperations = this.table("projectDeleteOperations");
    this.projectGroupCreateOperations = this.table(
      "projectGroupCreateOperations",
    );
    this.projectGroupUpdateOperations = this.table(
      "projectGroupUpdateOperations",
    );
    this.projectGroupDeleteOperations = this.table(
      "projectGroupDeleteOperations",
    );
  }
}

export const db = new Database();
