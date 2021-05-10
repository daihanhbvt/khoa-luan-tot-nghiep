import { ResCheckListItem } from 'src/check-list-item/models/res.check-list-item.model';
import { ResCheckListTemplateItem } from 'src/check-list-template-item/models/res.check-list-template-item.model';
import { ResCheckList } from 'src/check-list/models/res.check-list.model';
import { Mapper } from 'src/common';
import { ResFloors } from 'src/floors/models/res.floors.model';
import { ResRoomType } from 'src/room-type/models/res.room-type.model';
import { ResRoom } from 'src/room/models/res.room.model';
import { CheckListTemplate } from '../entities/check-list-template.entity';

export class ResCheckListTemplate {
  id: string;
  name: string;
  description: string;

  floors: ResFloors;
  room: ResRoom;
  room_type: ResRoomType;
  check_lists: ResCheckList[];
  check_list_template_items: ResCheckListTemplateItem[];

  constructor(json?: CheckListTemplate) {
    this.id = json?.Id;
    this.name = json?.Name;
    this.description = json?.Description;
    this.floors = json?.Floors ? Mapper.map(ResFloors, json.Floors) : null;
    this.room_type = json?.RoomType
      ? Mapper.map(ResRoomType, json.RoomType)
      : null;
    this.room = json?.Room ? Mapper.map(ResRoom, json.Room) : null;
    this.check_lists = json?.CheckLists
      ? Mapper.map(ResCheckList, json.CheckLists)
      : null;
    this.check_list_template_items = json?.CheckListTemplateItems
      ? Mapper.map(ResCheckListTemplateItem, json.CheckListTemplateItems)
      : null;
  }
}
