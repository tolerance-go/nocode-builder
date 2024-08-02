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
import { WidgetSlotModule } from './modules/widget-slot/widget-slot.module';
import { WidgetSlotAssignmentModule } from './modules/widget-slot-assignment/widget-slot.module';
import { ProjectDetailModule } from './modules/project-detail/project-detail.module';
import { ViewProjectModule } from './modules/view-project/view-project.module';
import { DataTableProjectModule } from './modules/data-table-project/data-table-project.module';
import { BluemapProjectModule } from './modules/bluemap-project/bluemap-project.module';

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
    WidgetSlotModule,
    WidgetSlotAssignmentModule,
    ProjectDetailModule,
    ViewProjectModule,
    DataTableProjectModule,
    BluemapProjectModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
