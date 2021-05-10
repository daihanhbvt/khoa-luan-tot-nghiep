import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CleanStatusTemplateService } from './clean-status-template.service';
import { CreateCleanStatusTemplateComponent } from './create/create.component';
import { DeleteCleanStatusTemplateComponent } from './delete/delete.component';

@Component({
  selector: 'app-clean-status-template',
  templateUrl: './clean-status-template.component.html',
  styleUrls: ['./clean-status-template.component.scss']
})
export class CleanStatusTemplateComponent implements OnInit {

  constructor(private service: CleanStatusTemplateService, public dialog: MatDialog) {

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
    const dialogRef = this.dialog.open(CreateCleanStatusTemplateComponent, {
      width: '550px',
      data: {properties: this.properties, dataSource}
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialog was closed');

      this.getDatasource();
    });
  }
  confirmDialog(dataSource?: any): void {
    const dialogRef = this.dialog.open(DeleteCleanStatusTemplateComponent, {
      width: '550px',
      data: {properties: this.properties, dataSource}
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialog was closed');

      this.getDatasource();
    });
  }
}