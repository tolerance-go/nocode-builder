import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { AppModule as UserAppModule } from './modules/app/app.module';

@Module({
  imports: [UserAppModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
