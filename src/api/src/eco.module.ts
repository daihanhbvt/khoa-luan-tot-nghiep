import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BrandModule } from './brand/brand.module';
import { CategoryModule } from './category/category.module';
import { DatabaseModule } from './config/database.module';
import { Module } from '@nestjs/common';
import { FloorsModule } from './floors/floors.module';
import { RoomModule } from './room/room.module';
import { CustomerModule } from './customer/customer.module';
import { HotelModule } from './hotel/hotel.module';
import { PublicAreaModule } from './public-area/public-area.module';
import { CleanStatusModule } from './clean-status/clean-status.module';
import { CheckStatusModule } from './check-status/check-status.module';
import { RoomTypeModule } from './room-type/room-type.module';
import { CheckListTemplateModule } from './check-list-template/check-list-template.module';
import { BookedModule } from './booked/booked.module';
import { CheckListTemplateItemModule } from './check-list-template-item/check-list-template-item.module';
import { CheckListModule } from './check-list/check-list.module';
import { CheckListItemModule } from './check-list-item/check-list-item.module';
import { CheckListResultModule } from './check-list-result/check-list-result.module';
import { CleanModule } from './clean/clean.module';
import { AssignmentModule } from './assignment/assigment.module';
import { RoomTypeTemplateModule } from './room-type-template/room-type-template.module';
import { CleanStatusTemplateModule } from './clean-status-template/clean-status-template.module';
import { CheckStatusTemplateModule } from './check-status-template/check-status-template.module';
import { RoomStatusTemplateModule } from './room-status-template/room-status-template.module';
import { InitModule } from './init/init.module';
import { RoomStatusModule } from './room-status/room-status.module';
import { CheckListTemplateDefaultModule } from './check-list-template-default/check-list-template-default.module';
import { CheckListTemplateDefaultItemModule } from './check-list-template-default-item/check-list-template-default-item.module';
import { TablePropertiesModule } from './table-properties/table-properties.module';
import { HotelUserModule } from './hotel-user/hotel-user.module';
import { CommentModule } from './comment/comment.module';
import { WorkFlowModule } from './work-flow/work-flow.module';

@Module({
  imports: [
    DatabaseModule,
    BrandModule,
    CategoryModule,
    FloorsModule,
    RoomModule,
    CustomerModule,
    HotelModule,
    PublicAreaModule,
    RoomModule,
    CleanStatusModule,
    CheckStatusModule,
    CheckListTemplateModule,
    RoomTypeModule,
    BookedModule,
    CheckListTemplateItemModule,
    CheckListModule,
    CheckListItemModule,
    CheckListResultModule,
    CleanModule,
    AssignmentModule,
    RoomTypeTemplateModule,
    CleanStatusTemplateModule,
    CheckStatusTemplateModule,
    RoomStatusTemplateModule,
    RoomStatusModule,
    InitModule,
    CheckListTemplateDefaultModule,
    CheckListTemplateDefaultItemModule,
    TablePropertiesModule,
    HotelUserModule,
    WorkFlowModule,
    CommentModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class EcoModule { }
