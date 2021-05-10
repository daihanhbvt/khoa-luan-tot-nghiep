import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CreateRoomComponent } from './create/create.component';
import { DeleteRoomComponent } from './delete/delete.component';
import { RoomService } from './room.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {


  constructor(
    public route: ActivatedRoute,
    private service: RoomService, public dialog: MatDialog) {

  }
  fid: any;
  hid: any;
  ngOnInit(): void {
    //get table properties

    this.fid = this.route.snapshot.paramMap.get('fid');
    this.hid = this.route.snapshot.paramMap.get('hid');
    this.service.getProperties().subscribe((res: any) => {
      // change column display
      this.properties = res.data.properties;
      this.columnsToDisplay = Object.keys(res.data.properties);
      this.columnsToDisplay.push('action');
    })
    console.log(this.fid)
    this.getDatasource(this.fid);
  }

  getDatasource(fid?: string) {
    // set datasource
    this.service.all(fid).subscribe((res: any) => {
      this.dataSource = res.data;
    })
  }

  dataSource: any;
  columnsToDisplay: any;
  expandedElement: any | null | undefined;
  properties: any;
  openDialog(dataSource?: any): void {
    const dialogRef = this.dialog.open(CreateRoomComponent, {
      width: '450px',
      data: { properties: this.properties, dataSource, fid: this.fid, hid: this.hid }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

      this.getDatasource(this.fid);
    });
  }
  confirmDialog(dataSource?: any): void {
    const dialogRef = this.dialog.open(DeleteRoomComponent, {
      width: '350px',
      data: { properties: this.properties, dataSource }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

      this.getDatasource(this.fid);
    });
  }
}
