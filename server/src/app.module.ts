import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { ProjectModule } from './modules/project/project.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { ProjectGroupModule } from './modules/project-group/project-group.module';
import { SyncModule } from './modules/sync/sync.module';
import { WidgetModule } from './modules/widget/widget.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 全局可用
    }),
    SyncModule,
    AuthModule,
    ProjectModule,
    ProjectGroupModule,
    UserModule,
    AuthModule,
    WidgetModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
