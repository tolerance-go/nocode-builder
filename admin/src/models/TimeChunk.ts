import { User } from './User';
import { TimeNode } from './TimeNode';

export class TimeChunk {
  id: number;
  name: string;
  description?: string;
  userId: number;
  user: User;
  timeNodes: TimeNode[];
  createdAt: Date;
  updatedAt: Date;

  constructor({
    id,
    name,
    description,
    userId,
    user,
    timeNodes,
    createdAt,
    updatedAt
  }: {
    id: number;
    name: string;
    description?: string;
    userId: number;
    user: User;
    timeNodes: TimeNode[];
    createdAt: Date;
    updatedAt: Date;
  }) {
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
