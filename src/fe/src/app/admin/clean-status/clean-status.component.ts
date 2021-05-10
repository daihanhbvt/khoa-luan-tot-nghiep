import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateCleanStatusComponent } from './create/create.component';
import { DeleteCleanStatusComponent } from './delete/delete.component';
import { CleanStatusService } from './clean-status.service';

@Component({
  selector: 'app-clean-status',
  templateUrl: './clean-status.component.html',
  styleUrls: ['./clean-status.component.scss']
})
export class CleanStatusComponent implements OnInit {

  
  constructor(private service: CleanStatusService, public dialog: MatDialog) {

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
    const dialogRef = this.dialog.open(CreateCleanStatusComponent, {
      width: '450px',
      data: {properties: this.properties, dataSource}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

      this.getDatasource();
    });
  }
  confirmDialog(dataSource?: any): void {
    const dialogRef = this.dialog.open(DeleteCleanStatusComponent, {
      width: '350px',
      data: {properties: this.properties, dataSource}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

      this.getDatasource();
    });
  }
}
