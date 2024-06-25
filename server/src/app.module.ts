import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { ProjectModule } from './modules/project/project.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { ProjectGroupModule } from './modules/project-group/project-group.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 全局可用
    }),
    AuthModule,
    ProjectModule,
    ProjectGroupModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
