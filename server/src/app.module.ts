import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { ProjectModule } from './modules/app/project.module';

@Module({
  imports: [ProjectModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
