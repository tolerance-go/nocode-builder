import { TimeChunkModelInsertType, db } from '@/_gen/db';
import { SingletonController } from '@/utils';

export class TimeChunkService extends SingletonController {
  create(data: TimeChunkModelInsertType) {
    const currentTime = new Date().getTime();
    db.timeChunks.add({
      ...data,
      createdAt: new Date(currentTime),
      updatedAt: new Date(currentTime),
      userId: -1,
    });
  }
}
