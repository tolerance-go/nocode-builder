import { db } from '@/_gen/db';
import { TimeChunkModel } from '@/_gen/models';
import { SingletonController } from '@/utils';

export class TimeChunkService extends SingletonController {
  create(data: Omit<TimeChunkModel, 'id'>) {
    db.timeChunks.add(data);
  }
}
