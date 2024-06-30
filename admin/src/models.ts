/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED        ##
 * ---------------------------------------------------------------
 */
export class User {
   id: number;
   name: string;
   email?: string;
   password: string;
   projects: Project;
   createdAt: Date;
   updatedAt: Date;
   projectGroups: ProjectGroup;
   timeChunk: TimeChunk;

  constructor({ id, name, email, password, projects, createdAt, updatedAt, projectGroups, timeChunk }: { id: number; name: string; email?: string; password: string; projects: Project; createdAt: Date; updatedAt: Date; projectGroups: ProjectGroup; timeChunk: TimeChunk }) {
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

export class Project {
   id: number;
   name: string;
   ownerId: number;
   owner: User;
   createdAt: Date;
   updatedAt: Date;
   projectGroup?: ProjectGroup;
   projectGroupId?: number;
   operations: ProjectOperation;

  constructor({ id, name, ownerId, owner, createdAt, updatedAt, projectGroup, projectGroupId, operations }: { id: number; name: string; ownerId: number; owner: User; createdAt: Date; updatedAt: Date; projectGroup?: ProjectGroup; projectGroupId?: number; operations: ProjectOperation }) {
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

export class ProjectGroup {
   id: number;
   name: string;
   parentGroupId?: number;
   parentGroup?: ProjectGroup;
   childGroups: ProjectGroup;
   ownerId: number;
   owner: User;
   projects: Project;
   createdAt: Date;
   updatedAt: Date;
   operations: ProjectGroupOperation;

  constructor({ id, name, parentGroupId, parentGroup, childGroups, ownerId, owner, projects, createdAt, updatedAt, operations }: { id: number; name: string; parentGroupId?: number; parentGroup?: ProjectGroup; childGroups: ProjectGroup; ownerId: number; owner: User; projects: Project; createdAt: Date; updatedAt: Date; operations: ProjectGroupOperation }) {
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

export class ProjectGroupOperation {
   id: number;
   projectGroupId: number;
   projectGroup: ProjectGroup;
   projectGroupCreateOperationId?: number;
   projectGroupUpdateOperationId?: number;
   projectGroupDeleteOperationId?: number;
   timeNode?: TimeNode;
   projectGroupCreateOperation?: ProjectGroupCreateOperation;
   projectGroupUpdateOperation?: ProjectGroupUpdateOperation;
   projectGroupDeleteOperation?: ProjectGroupDeleteOperation;

  constructor({ id, projectGroupId, projectGroup, projectGroupCreateOperationId, projectGroupUpdateOperationId, projectGroupDeleteOperationId, timeNode, projectGroupCreateOperation, projectGroupUpdateOperation, projectGroupDeleteOperation }: { id: number; projectGroupId: number; projectGroup: ProjectGroup; projectGroupCreateOperationId?: number; projectGroupUpdateOperationId?: number; projectGroupDeleteOperationId?: number; timeNode?: TimeNode; projectGroupCreateOperation?: ProjectGroupCreateOperation; projectGroupUpdateOperation?: ProjectGroupUpdateOperation; projectGroupDeleteOperation?: ProjectGroupDeleteOperation }) {
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

export class ProjectGroupDeleteOperation {
   id: number;
   recordId: number;
   createdAt: Date;
   updatedAt: Date;
   projectGroupOperation: ProjectGroupOperation;
   projectGroupOperationId: number;

  constructor({ id, recordId, createdAt, updatedAt, projectGroupOperation, projectGroupOperationId }: { id: number; recordId: number; createdAt: Date; updatedAt: Date; projectGroupOperation: ProjectGroupOperation; projectGroupOperationId: number }) {
    this.id = id;
    this.recordId = recordId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.projectGroupOperation = projectGroupOperation;
    this.projectGroupOperationId = projectGroupOperationId;
  }
}

export class ProjectGroupUpdateOperation {
   id: number;
   recordId: number;
   createdAt: Date;
   updatedAt: Date;
   projectGroupOperation: ProjectGroupOperation;
   projectGroupOperationId: number;

  constructor({ id, recordId, createdAt, updatedAt, projectGroupOperation, projectGroupOperationId }: { id: number; recordId: number; createdAt: Date; updatedAt: Date; projectGroupOperation: ProjectGroupOperation; projectGroupOperationId: number }) {
    this.id = id;
    this.recordId = recordId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.projectGroupOperation = projectGroupOperation;
    this.projectGroupOperationId = projectGroupOperationId;
  }
}

export class ProjectGroupCreateOperation {
   id: number;
   recordId: number;
   createdAt: Date;
   updatedAt: Date;
   projectGroupOperation: ProjectGroupOperation;
   projectGroupOperationId: number;

  constructor({ id, recordId, createdAt, updatedAt, projectGroupOperation, projectGroupOperationId }: { id: number; recordId: number; createdAt: Date; updatedAt: Date; projectGroupOperation: ProjectGroupOperation; projectGroupOperationId: number }) {
    this.id = id;
    this.recordId = recordId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.projectGroupOperation = projectGroupOperation;
    this.projectGroupOperationId = projectGroupOperationId;
  }
}

export class TimeNode {
   id: number;
   timeChunkId: number;
   timeChunk: TimeChunk;
   projectOperationId?: number;
   projectOperation?: ProjectOperation;
   projectGroupOperationId?: number;
   ProjectGroupOperation?: ProjectGroupOperation;
   createdAt: Date;
   updatedAt: Date;

  constructor({ id, timeChunkId, timeChunk, projectOperationId, projectOperation, projectGroupOperationId, ProjectGroupOperation, createdAt, updatedAt }: { id: number; timeChunkId: number; timeChunk: TimeChunk; projectOperationId?: number; projectOperation?: ProjectOperation; projectGroupOperationId?: number; ProjectGroupOperation?: ProjectGroupOperation; createdAt: Date; updatedAt: Date }) {
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

export class ProjectOperation {
   id: number;
   projectId: number;
   project: Project;
   projectCreateOperationId?: number;
   projectUpdateOperationId?: number;
   projectDeleteOperationId?: number;
   timeNode?: TimeNode;
   projectUpdateOperation?: ProjectUpdateOperation;
   projectDeleteOperation?: ProjectDeleteOperation;
   projectCreateOperation?: ProjectCreateOperation;

  constructor({ id, projectId, project, projectCreateOperationId, projectUpdateOperationId, projectDeleteOperationId, timeNode, projectUpdateOperation, projectDeleteOperation, projectCreateOperation }: { id: number; projectId: number; project: Project; projectCreateOperationId?: number; projectUpdateOperationId?: number; projectDeleteOperationId?: number; timeNode?: TimeNode; projectUpdateOperation?: ProjectUpdateOperation; projectDeleteOperation?: ProjectDeleteOperation; projectCreateOperation?: ProjectCreateOperation }) {
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

export class ProjectCreateOperation {
   id: number;
   recordId: number;
   createdAt: Date;
   updatedAt: Date;
   projectOperation: ProjectOperation;
   projectOperationId: number;

  constructor({ id, recordId, createdAt, updatedAt, projectOperation, projectOperationId }: { id: number; recordId: number; createdAt: Date; updatedAt: Date; projectOperation: ProjectOperation; projectOperationId: number }) {
    this.id = id;
    this.recordId = recordId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.projectOperation = projectOperation;
    this.projectOperationId = projectOperationId;
  }
}

export class ProjectDeleteOperation {
   id: number;
   recordId: number;
   createdAt: Date;
   updatedAt: Date;
   projectOperation: ProjectOperation;
   projectOperationId: number;

  constructor({ id, recordId, createdAt, updatedAt, projectOperation, projectOperationId }: { id: number; recordId: number; createdAt: Date; updatedAt: Date; projectOperation: ProjectOperation; projectOperationId: number }) {
    this.id = id;
    this.recordId = recordId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.projectOperation = projectOperation;
    this.projectOperationId = projectOperationId;
  }
}

export class ProjectUpdateOperation {
   id: number;
   recordId: number;
   createdAt: Date;
   updatedAt: Date;
   projectOperation: ProjectOperation;
   projectOperationId: number;

  constructor({ id, recordId, createdAt, updatedAt, projectOperation, projectOperationId }: { id: number; recordId: number; createdAt: Date; updatedAt: Date; projectOperation: ProjectOperation; projectOperationId: number }) {
    this.id = id;
    this.recordId = recordId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.projectOperation = projectOperation;
    this.projectOperationId = projectOperationId;
  }
}

export class TimeChunk {
   id: number;
   name: string;
   description?: string;
   userId: number;
   user: User;
   timeNodes: TimeNode;
   createdAt: Date;
   updatedAt: Date;

  constructor({ id, name, description, userId, user, timeNodes, createdAt, updatedAt }: { id: number; name: string; description?: string; userId: number; user: User; timeNodes: TimeNode; createdAt: Date; updatedAt: Date }) {
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