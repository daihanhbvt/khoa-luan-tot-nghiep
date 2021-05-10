import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateCleanComponent } from './create/create.component';
import { DeleteCleanComponent } from './delete/delete.component';
import { CleanService } from './clean.service';

@Component({
  selector: 'app-clean',
  templateUrl: './clean.component.html',
  styleUrls: ['./clean.component.scss']
})
export class CleanComponent implements OnInit {

  
  constructor(private service: CleanService, public dialog: MatDialog) {

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
    const dialogRef = this.dialog.open(CreateCleanComponent, {
      width: '450px',
      data: {properties: this.properties, dataSource}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

      this.getDatasource();
    });
  }
  confirmDialog(dataSource?: any): void {
    const dialogRef = this.dialog.open(DeleteCleanComponent, {
      width: '350px',
      data: {properties: this.properties, dataSource}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

      this.getDatasource();
    });
  }
}
