/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED        ##
 * ---------------------------------------------------------------
 */

export class UserModel {
   id: number;
   name: string;
   email?: string;
   password: string;
   projects: ProjectModel;
   createdAt: Date;
   updatedAt: Date;
   projectGroups: ProjectGroupModel;
   timeChunk: TimeChunkModel;

  constructor({ id, name, email, password, projects, createdAt, updatedAt, projectGroups, timeChunk }: { id: number; name: string; email?: string; password: string; projects: ProjectModel; createdAt: Date; updatedAt: Date; projectGroups: ProjectGroupModel; timeChunk: TimeChunkModel }) {
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

export class ProjectModel {
   id: number;
   name: string;
   ownerId: number;
   owner: UserModel;
   createdAt: Date;
   updatedAt: Date;
   projectGroup?: ProjectGroupModel;
   projectGroupId?: number;
   operations: ProjectOperationModel;

  constructor({ id, name, ownerId, owner, createdAt, updatedAt, projectGroup, projectGroupId, operations }: { id: number; name: string; ownerId: number; owner: UserModel; createdAt: Date; updatedAt: Date; projectGroup?: ProjectGroupModel; projectGroupId?: number; operations: ProjectOperationModel }) {
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

export class ProjectGroupModel {
   id: number;
   name: string;
   parentGroupId?: number;
   parentGroup?: ProjectGroupModel;
   childGroups: ProjectGroupModel;
   ownerId: number;
   owner: UserModel;
   projects: ProjectModel;
   createdAt: Date;
   updatedAt: Date;
   operations: ProjectGroupOperationModel;

  constructor({ id, name, parentGroupId, parentGroup, childGroups, ownerId, owner, projects, createdAt, updatedAt, operations }: { id: number; name: string; parentGroupId?: number; parentGroup?: ProjectGroupModel; childGroups: ProjectGroupModel; ownerId: number; owner: UserModel; projects: ProjectModel; createdAt: Date; updatedAt: Date; operations: ProjectGroupOperationModel }) {
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

export class ProjectGroupOperationModel {
   id: number;
   projectGroupId: number;
   projectGroup: ProjectGroupModel;
   projectGroupCreateOperationId?: number;
   projectGroupUpdateOperationId?: number;
   projectGroupDeleteOperationId?: number;
   timeNode?: TimeNodeModel;
   projectGroupCreateOperation?: ProjectGroupCreateOperationModel;
   projectGroupUpdateOperation?: ProjectGroupUpdateOperationModel;
   projectGroupDeleteOperation?: ProjectGroupDeleteOperationModel;

  constructor({ id, projectGroupId, projectGroup, projectGroupCreateOperationId, projectGroupUpdateOperationId, projectGroupDeleteOperationId, timeNode, projectGroupCreateOperation, projectGroupUpdateOperation, projectGroupDeleteOperation }: { id: number; projectGroupId: number; projectGroup: ProjectGroupModel; projectGroupCreateOperationId?: number; projectGroupUpdateOperationId?: number; projectGroupDeleteOperationId?: number; timeNode?: TimeNodeModel; projectGroupCreateOperation?: ProjectGroupCreateOperationModel; projectGroupUpdateOperation?: ProjectGroupUpdateOperationModel; projectGroupDeleteOperation?: ProjectGroupDeleteOperationModel }) {
    this.id = id;
    this.projectGroupId = projectGroupId;
    this.projectGroup = projectGroup;
    this.projectGroupCreateOperationId = projectGroupCreateOperationId;
    this.projectGroupUpdateOperationId = projectGroupUpdateOperationId;
    this.projectGroupDeleteOperationId = projectGroupDeleteOperationId;
    this.timeNode = timeNode;
    this.projectGroupCreateOperation = projectGroupCreateOperation;
    this.projectGroupUpdateOperation = projectGroupUpdateOperation;
    this.projectGroupDeleteOperation = projectGroupDeleteOperation;
  }
}

export class ProjectGroupDeleteOperationModel {
   id: number;
   recordId: number;
   createdAt: Date;
   updatedAt: Date;
   projectGroupOperation: ProjectGroupOperationModel;
   projectGroupOperationId: number;

  constructor({ id, recordId, createdAt, updatedAt, projectGroupOperation, projectGroupOperationId }: { id: number; recordId: number; createdAt: Date; updatedAt: Date; projectGroupOperation: ProjectGroupOperationModel; projectGroupOperationId: number }) {
    this.id = id;
    this.recordId = recordId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.projectGroupOperation = projectGroupOperation;
    this.projectGroupOperationId = projectGroupOperationId;
  }
}

export class ProjectGroupUpdateOperationModel {
   id: number;
   recordId: number;
   createdAt: Date;
   updatedAt: Date;
   projectGroupOperation: ProjectGroupOperationModel;
   projectGroupOperationId: number;

  constructor({ id, recordId, createdAt, updatedAt, projectGroupOperation, projectGroupOperationId }: { id: number; recordId: number; createdAt: Date; updatedAt: Date; projectGroupOperation: ProjectGroupOperationModel; projectGroupOperationId: number }) {
    this.id = id;
    this.recordId = recordId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.projectGroupOperation = projectGroupOperation;
    this.projectGroupOperationId = projectGroupOperationId;
  }
}

export class ProjectGroupCreateOperationModel {
   id: number;
   recordId: number;
   createdAt: Date;
   updatedAt: Date;
   projectGroupOperation: ProjectGroupOperationModel;
   projectGroupOperationId: number;

  constructor({ id, recordId, createdAt, updatedAt, projectGroupOperation, projectGroupOperationId }: { id: number; recordId: number; createdAt: Date; updatedAt: Date; projectGroupOperation: ProjectGroupOperationModel; projectGroupOperationId: number }) {
    this.id = id;
    this.recordId = recordId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.projectGroupOperation = projectGroupOperation;
    this.projectGroupOperationId = projectGroupOperationId;
  }
}

export class TimeNodeModel {
   id: number;
   timeChunkId: number;
   timeChunk: TimeChunkModel;
   projectOperationId?: number;
   projectOperation?: ProjectOperationModel;
   projectGroupOperationId?: number;
   ProjectGroupOperation?: ProjectGroupOperationModel;
   createdAt: Date;
   updatedAt: Date;

  constructor({ id, timeChunkId, timeChunk, projectOperationId, projectOperation, projectGroupOperationId, ProjectGroupOperation, createdAt, updatedAt }: { id: number; timeChunkId: number; timeChunk: TimeChunkModel; projectOperationId?: number; projectOperation?: ProjectOperationModel; projectGroupOperationId?: number; ProjectGroupOperation?: ProjectGroupOperationModel; createdAt: Date; updatedAt: Date }) {
    this.id = id;
    this.timeChunkId = timeChunkId;
    this.timeChunk = timeChunk;
    this.projectOperationId = projectOperationId;
    this.projectOperation = projectOperation;
    this.projectGroupOperationId = projectGroupOperationId;
    this.ProjectGroupOperation = ProjectGroupOperation;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export class ProjectOperationModel {
   id: number;
   projectId: number;
   project: ProjectModel;
   projectCreateOperationId?: number;
   projectUpdateOperationId?: number;
   projectDeleteOperationId?: number;
   timeNode?: TimeNodeModel;
   projectUpdateOperation?: ProjectUpdateOperationModel;
   projectDeleteOperation?: ProjectDeleteOperationModel;
   projectCreateOperation?: ProjectCreateOperationModel;

  constructor({ id, projectId, project, projectCreateOperationId, projectUpdateOperationId, projectDeleteOperationId, timeNode, projectUpdateOperation, projectDeleteOperation, projectCreateOperation }: { id: number; projectId: number; project: ProjectModel; projectCreateOperationId?: number; projectUpdateOperationId?: number; projectDeleteOperationId?: number; timeNode?: TimeNodeModel; projectUpdateOperation?: ProjectUpdateOperationModel; projectDeleteOperation?: ProjectDeleteOperationModel; projectCreateOperation?: ProjectCreateOperationModel }) {
    this.id = id;
    this.projectId = projectId;
    this.project = project;
    this.projectCreateOperationId = projectCreateOperationId;
    this.projectUpdateOperationId = projectUpdateOperationId;
    this.projectDeleteOperationId = projectDeleteOperationId;
    this.timeNode = timeNode;
    this.projectUpdateOperation = projectUpdateOperation;
    this.projectDeleteOperation = projectDeleteOperation;
    this.projectCreateOperation = projectCreateOperation;
  }
}

export class ProjectCreateOperationModel {
   id: number;
   recordId: number;
   createdAt: Date;
   updatedAt: Date;
   projectOperation: ProjectOperationModel;
   projectOperationId: number;

  constructor({ id, recordId, createdAt, updatedAt, projectOperation, projectOperationId }: { id: number; recordId: number; createdAt: Date; updatedAt: Date; projectOperation: ProjectOperationModel; projectOperationId: number }) {
    this.id = id;
    this.recordId = recordId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.projectOperation = projectOperation;
    this.projectOperationId = projectOperationId;
  }
}

export class ProjectDeleteOperationModel {
   id: number;
   recordId: number;
   createdAt: Date;
   updatedAt: Date;
   projectOperation: ProjectOperationModel;
   projectOperationId: number;

  constructor({ id, recordId, createdAt, updatedAt, projectOperation, projectOperationId }: { id: number; recordId: number; createdAt: Date; updatedAt: Date; projectOperation: ProjectOperationModel; projectOperationId: number }) {
    this.id = id;
    this.recordId = recordId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.projectOperation = projectOperation;
    this.projectOperationId = projectOperationId;
  }
}

export class ProjectUpdateOperationModel {
   id: number;
   recordId: number;
   createdAt: Date;
   updatedAt: Date;
   projectOperation: ProjectOperationModel;
   projectOperationId: number;

  constructor({ id, recordId, createdAt, updatedAt, projectOperation, projectOperationId }: { id: number; recordId: number; createdAt: Date; updatedAt: Date; projectOperation: ProjectOperationModel; projectOperationId: number }) {
    this.id = id;
    this.recordId = recordId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.projectOperation = projectOperation;
    this.projectOperationId = projectOperationId;
  }
}

export class TimeChunkModel {
   id: number;
   name: string;
   description?: string;
   userId: number;
   user: UserModel;
   timeNodes: TimeNodeModel;
   createdAt: Date;
   updatedAt: Date;

  constructor({ id, name, description, userId, user, timeNodes, createdAt, updatedAt }: { id: number; name: string; description?: string; userId: number; user: UserModel; timeNodes: TimeNodeModel; createdAt: Date; updatedAt: Date }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.userId = userId;
    this.user = user;
    this.timeNodes = timeNodes;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}