import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CreatePublicAreaComponent } from './create/create.component';
import { DeletePublicAreaComponent } from './delete/delete.component';
import { PublicAreaService } from './public-area.service';

@Component({
  selector: 'app-public-area',
  templateUrl: './public-area.component.html',
  styleUrls: ['./public-area.component.scss']
})
export class PublicAreaComponent implements OnInit {


  constructor(
    public route: ActivatedRoute,
    private service: PublicAreaService, public dialog: MatDialog) {

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
    const dialogRef = this.dialog.open(CreatePublicAreaComponent, {
      width: '450px',
      data: { properties: this.properties, dataSource, fid: this.fid, hid: this.hid }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

      this.getDatasource(this.fid);
    });
  }
  confirmDialog(dataSource?: any): void {
    const dialogRef = this.dialog.open(DeletePublicAreaComponent, {
      width: '350px',
      data: { properties: this.properties, dataSource }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

      this.getDatasource(this.fid);
    });
  }
}
