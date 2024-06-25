import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './events/events.module';
import { EventsService } from './events/events.service';
import { UserController } from './modules/user/user.controller';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [EventsModule, UserModule],
  controllers: [AppController, UserController],
  providers: [AppService, EventsService],
})
export class AppModule {}
