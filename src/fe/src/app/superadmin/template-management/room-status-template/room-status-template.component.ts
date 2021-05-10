import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateRoomStatusTemplateComponent } from './create/create.component';
import { DeleteRoomStatusTemplateComponent } from './delete/delete.component';
import { RoomStatusTemplateService } from './room-status-template.service';

@Component({
  selector: 'app-room-status-template',
  templateUrl: './room-status-template.component.html',
  styleUrls: ['./room-status-template.component.scss']
})
export class RoomStatusTemplateComponent implements OnInit {

  constructor(private service: RoomStatusTemplateService, public dialog: MatDialog) {

  }

  ngOnInit(): void {
    //get table properties
    this.service.getProperties().subscribe((res: any) => {
      // change column display
      this.properties = res.data.properties;
      this.columnsToDisplay = Object.keys(res.data.properties);
      this.columnsToDisplay.push('action');
    })
   
    this.getDatasource();
  }

  getDatasource() {
 // set datasource
 this.service.all().subscribe((res: any) => {
  this.dataSource = res.data;
})
  }

  dataSource: any;
  columnsToDisplay: any;
  expandedElement: any | null | undefined;
  properties: any;
  openDialog(dataSource?: any): void {
    const dialogRef = this.dialog.open(CreateRoomStatusTemplateComponent, {
      width: '550px',
      data: {properties: this.properties, dataSource}
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialog was closed');

      this.getDatasource();
    });
  }
  confirmDialog(dataSource?: any): void {
    const dialogRef = this.dialog.open(DeleteRoomStatusTemplateComponent, {
      width: '550px',
      data: {properties: this.properties, dataSource}
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialog was closed');

      this.getDatasource();
    });
  }
}