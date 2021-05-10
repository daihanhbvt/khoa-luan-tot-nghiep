import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateCheckListTemplateDefaultItemComponent } from './create/create.component';
import { DeleteCheckListTemplateDefaultItemComponent } from './delete/delete.component';
import { CheckListTemplateDefaultItemService } from './service';

@Component({
  selector: 'app-check-list-template-default-item',
  templateUrl: './check-list-template-default-item.component.html',
  styleUrls: ['./check-list-template-default-item.component.scss']
})
export class CheckListTemplateDefaultItemComponent implements OnInit {

  
  
  constructor(
    public route: ActivatedRoute,
    private service: CheckListTemplateDefaultItemService, 
    public dialog: MatDialog) {

  }
  id : any;
  ngOnInit(): void {
    // get check_list_template_default_id from router
    this.id = this.route.snapshot.paramMap.get('bank');

    //get table properties
    console.log('init');
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
    const dialogRef = this.dialog.open(CreateCheckListTemplateDefaultItemComponent, {
      width: '550px',
      data: {properties: this.properties, dataSource, check_list_template_default_id: this.id}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

      this.getDatasource();
    });
  }
  confirmDialog(dataSource?: any): void {
    const dialogRef = this.dialog.open(DeleteCheckListTemplateDefaultItemComponent, {
      width: '550px',
      data: {properties: this.properties, dataSource}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

      this.getDatasource();
    });
  }
}
