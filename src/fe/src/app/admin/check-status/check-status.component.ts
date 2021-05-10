import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateCheckStatusComponent } from './create/create.component';
import { DeleteCheckStatusComponent } from './delete/delete.component';
import { CheckStatusService } from './check-status.service';

@Component({
  selector: 'app-check-status',
  templateUrl: './check-status.component.html',
  styleUrls: ['./check-status.component.scss']
})
export class CheckStatusComponent implements OnInit {

  
  constructor(private service: CheckStatusService, public dialog: MatDialog) {

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
    const dialogRef = this.dialog.open(CreateCheckStatusComponent, {
      width: '450px',
      data: {properties: this.properties, dataSource}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

      this.getDatasource();
    });
  }
  confirmDialog(dataSource?: any): void {
    const dialogRef = this.dialog.open(DeleteCheckStatusComponent, {
      width: '350px',
      data: {properties: this.properties, dataSource}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

      this.getDatasource();
    });
  }
}
