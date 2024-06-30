

class User {
   id: number;
   name: string;
   email?: string;
   password: string;
   projects: Project;
   createdAt: Date;
   updatedAt: Date;
   projectGroups: ProjectGroup;
   timeChunk: TimeChunk;
}

class Project {
   id: number;
   name: string;
   ownerId: number;
   owner: User;
   createdAt: Date;
   updatedAt: Date;
   projectGroup?: ProjectGroup;
   projectGroupId?: number;
   operations: ProjectOperation;
}

class ProjectGroup {
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
}

class ProjectGroupOperation {
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
}

class ProjectGroupDeleteOperation {
   id: number;
   recordId: number;
   createdAt: Date;
   updatedAt: Date;
   projectGroupOperation: ProjectGroupOperation;
   projectGroupOperationId: number;
}

class ProjectGroupUpdateOperation {
   id: number;
   recordId: number;
   createdAt: Date;
   updatedAt: Date;
   projectGroupOperation: ProjectGroupOperation;
   projectGroupOperationId: number;
}

class ProjectGroupCreateOperation {
   id: number;
   recordId: number;
   createdAt: Date;
   updatedAt: Date;
   projectGroupOperation: ProjectGroupOperation;
   projectGroupOperationId: number;
}

class TimeNode {
   id: number;
   timeChunkId: number;
   timeChunk: TimeChunk;
   projectOperationId?: number;
   projectOperation?: ProjectOperation;
   projectGroupOperationId?: number;
   ProjectGroupOperation?: ProjectGroupOperation;
   createdAt: Date;
   updatedAt: Date;
}

class ProjectOperation {
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
}

class ProjectCreateOperation {
   id: number;
   recordId: number;
   createdAt: Date;
   updatedAt: Date;
   projectOperation: ProjectOperation;
   projectOperationId: number;
}

class ProjectDeleteOperation {
   id: number;
   recordId: number;
   createdAt: Date;
   updatedAt: Date;
   projectOperation: ProjectOperation;
   projectOperationId: number;
}

class ProjectUpdateOperation {
   id: number;
   recordId: number;
   createdAt: Date;
   updatedAt: Date;
   projectOperation: ProjectOperation;
   projectOperationId: number;
}

class TimeChunk {
   id: number;
   name: string;
   description?: string;
   userId: number;
   user: User;
   timeNodes: TimeNode;
   createdAt: Date;
   updatedAt: Date;
}