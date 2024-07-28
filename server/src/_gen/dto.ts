/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED        ##
 * ---------------------------------------------------------------
 */

import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsDateString,
  IsEnum,
} from 'class-validator';

export class UserDto {
  id: number;
  name: string;
  email?: string;
  password: string;
  projects: ProjectModel[];
  createdAt: Date;
  updatedAt: Date;
  projectGroups: ProjectGroupModel[];
}

export class ProjectDto {
  id: number;
  name: string;
  ownerId: number;
  owner: UserModel;
  createdAt: Date;
  updatedAt: Date;
  projectGroup?: ProjectGroupModel;
  projectGroupId?: number;
  type: ProjectTypeEnum;
}

export class ProjectGroupDto {
  id: number;
  name: string;
  parentGroupId?: number;
  parentGroup?: ProjectGroupModel;
  childGroups: ProjectGroupModel[];
  ownerId: number;
  owner: UserModel;
  projects: ProjectModel[];
  createdAt: Date;
  updatedAt: Date;
}
