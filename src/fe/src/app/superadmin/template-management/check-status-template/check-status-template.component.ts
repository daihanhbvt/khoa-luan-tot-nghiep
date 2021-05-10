import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CheckStatusTemplateService } from './check-status-template.service';
import { CreateCheckStatusTemplateComponent } from './create/create.component';
import { DeleteCheckStatusTemplateComponent } from './delete/delete.component';

@Component({
  selector: 'app-check-status-template',
  templateUrl: './check-status-template.component.html',
  styleUrls: ['./check-status-template.component.scss']
})
export class CheckStatusTemplateComponent implements OnInit {

  constructor(private service: CheckStatusTemplateService, public dialog: MatDialog) {

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
    const dialogRef = this.dialog.open(CreateCheckStatusTemplateComponent, {
      width: '550px',
      data: {properties: this.properties, dataSource}
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialog was closed');

      this.getDatasource();
    });
  }
  confirmDialog(dataSource?: any): void {
    const dialogRef = this.dialog.open(DeleteCheckStatusTemplateComponent, {
      width: '550px',
      data: {properties: this.properties, dataSource}
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialog was closed');

      this.getDatasource();
    });
  }
}