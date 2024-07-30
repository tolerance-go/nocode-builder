/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED        ##
 * ---------------------------------------------------------------
 */

import { ProjectTypeEnum } from './models';

export class UserModelRecord {
  id: number;

  name: string;

  email?: string;

  password: string;

  createdAt: Date;

  updatedAt: Date;

  constructor({
    id,
    name,
    email,
    password,
    createdAt,
    updatedAt,
  }: {
    id: number;
    name: string;
    email?: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export class ProjectModelRecord {
  id: number;

  name: string;

  ownerId: number;

  createdAt: Date;

  updatedAt: Date;

  projectGroupId?: number;

  type: ProjectTypeEnum;

  constructor({
    id,
    name,
    ownerId,
    createdAt,
    updatedAt,
    projectGroupId,
    type,
  }: {
    id: number;
    name: string;
    ownerId: number;
    createdAt: Date;
    updatedAt: Date;
    projectGroupId?: number;
    type: ProjectTypeEnum;
  }) {
    this.id = id;
    this.name = name;
    this.ownerId = ownerId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.projectGroupId = projectGroupId;
    this.type = type;
  }
}

export class ProjectGroupModelRecord {
  id: number;

  name: string;

  parentGroupId?: number;

  ownerId: number;

  createdAt: Date;

  updatedAt: Date;

  constructor({
    id,
    name,
    parentGroupId,
    ownerId,
    createdAt,
    updatedAt,
  }: {
    id: number;
    name: string;
    parentGroupId?: number;
    ownerId: number;
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.id = id;
    this.name = name;
    this.parentGroupId = parentGroupId;
    this.ownerId = ownerId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
