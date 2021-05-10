import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RoomTypeTemplateService } from '../room-type-template/room-type-template.service';
import { CreateTablePropertiesComponent } from './create/create.component';
import { DeleteTablePropertiesComponent } from './delete/delete.component';
import { TablePropertiesService } from './table-properties.service';

@Component({
  selector: 'app-table-properties',
  templateUrl: './table-properties.component.html',
  styleUrls: ['./table-properties.component.scss']
})
export class TablePropertiesComponent implements OnInit {

  constructor(private service: TablePropertiesService, public dialog: MatDialog) {

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
    const dialogRef = this.dialog.open(CreateTablePropertiesComponent, {
      width: '550px',
      data: {properties: this.properties, dataSource}
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialog was closed');

      this.getDatasource();
    });
  }
  confirmDialog(dataSource?: any): void {
    const dialogRef = this.dialog.open(DeleteTablePropertiesComponent, {
      width: '550px',
      data: {properties: this.properties, dataSource}
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialog was closed');

      this.getDatasource();
    });
  }
}

