import {
  User,
  Project,
  ProjectGroup,
  TimeChunk,
  TimeNode,
  ProjectOperation,
  ProjectGroupOperation,
  ProjectCreateOperation,
  ProjectUpdateOperation,
  ProjectDeleteOperation,
  ProjectGroupCreateOperation,
  ProjectGroupUpdateOperation,
  ProjectGroupDeleteOperation,
} from "@/models";
import Dexie, { Table } from "dexie";

export class Database extends Dexie {
  users: Table<User, number>;
  projects: Table<Project, number>;
  projectGroups: Table<ProjectGroup, number>;
  timeChunks: Table<TimeChunk, number>;
  timeNodes: Table<TimeNode, number>;
  projectOperations: Table<ProjectOperation, number>;
  projectGroupOperations: Table<ProjectGroupOperation, number>;
  projectCreateOperations: Table<ProjectCreateOperation, number>;
  projectUpdateOperations: Table<ProjectUpdateOperation, number>;
  projectDeleteOperations: Table<ProjectDeleteOperation, number>;
  projectGroupCreateOperations: Table<ProjectGroupCreateOperation, number>;
  projectGroupUpdateOperations: Table<ProjectGroupUpdateOperation, number>;
  projectGroupDeleteOperations: Table<ProjectGroupDeleteOperation, number>;

  constructor() {
    super("database");
    this.version(1).stores({
      users: "++id, name, email, password, createdAt, updatedAt",
      projects: "++id, name, ownerId, createdAt, updatedAt, projectGroupId",
      projectGroups: "++id, name, parentGroupId, ownerId, createdAt, updatedAt",
      timeChunks: "++id, name, description, userId, createdAt, updatedAt",
      timeNodes:
        "++id, timeChunkId, projectOperationId, projectGroupOperationId, createdAt, updatedAt",
      projectOperations:
        "++id, projectId, projectCreateOperationId, projectUpdateOperationId, projectDeleteOperationId",
      projectGroupOperations:
        "++id, projectGroupId, projectGroupCreateOperationId, projectGroupUpdateOperationId, projectGroupDeleteOperationId",
      projectCreateOperations:
        "++id, recordId, createdAt, updatedAt, projectOperationId",
      projectUpdateOperations:
        "++id, recordId, createdAt, updatedAt, projectOperationId",
      projectDeleteOperations:
        "++id, recordId, createdAt, updatedAt, projectOperationId",
      projectGroupCreateOperations:
        "++id, recordId, createdAt, updatedAt, projectGroupOperationId",
      projectGroupUpdateOperations:
        "++id, recordId, createdAt, updatedAt, projectGroupOperationId",
      projectGroupDeleteOperations:
        "++id, recordId, createdAt, updatedAt, projectGroupOperationId",
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
