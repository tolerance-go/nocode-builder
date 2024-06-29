import { User as _User } from './user';
import { Project as _Project } from './project';
import { ProjectGroup as _ProjectGroup } from './project_group';
import { TimeChunk as _TimeChunk } from './time_chunk';
import { TimeNode as _TimeNode } from './time_node';
import { ProjectOperation as _ProjectOperation } from './project_operation';
import { ProjectGroupOperation as _ProjectGroupOperation } from './project_group_operation';
import { ProjectCreateOperation as _ProjectCreateOperation } from './project_create_operation';
import { ProjectUpdateOperation as _ProjectUpdateOperation } from './project_update_operation';
import { ProjectDeleteOperation as _ProjectDeleteOperation } from './project_delete_operation';
import { ProjectGroupCreateOperation as _ProjectGroupCreateOperation } from './project_group_create_operation';
import { ProjectGroupUpdateOperation as _ProjectGroupUpdateOperation } from './project_group_update_operation';
import { ProjectGroupDeleteOperation as _ProjectGroupDeleteOperation } from './project_group_delete_operation';

export namespace PrismaModel {
  export class User extends _User {}
  export class Project extends _Project {}
  export class ProjectGroup extends _ProjectGroup {}
  export class TimeChunk extends _TimeChunk {}
  export class TimeNode extends _TimeNode {}
  export class ProjectOperation extends _ProjectOperation {}
  export class ProjectGroupOperation extends _ProjectGroupOperation {}
  export class ProjectCreateOperation extends _ProjectCreateOperation {}
  export class ProjectUpdateOperation extends _ProjectUpdateOperation {}
  export class ProjectDeleteOperation extends _ProjectDeleteOperation {}
  export class ProjectGroupCreateOperation extends _ProjectGroupCreateOperation {}
  export class ProjectGroupUpdateOperation extends _ProjectGroupUpdateOperation {}
  export class ProjectGroupDeleteOperation extends _ProjectGroupDeleteOperation {}

  export const extraModels = [
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
  ];
}
