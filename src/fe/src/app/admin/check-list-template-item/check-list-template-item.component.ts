import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateCheckListTemplateItemComponent } from './create/create.component';
import { DeleteCheckListTemplateItemComponent } from './delete/delete.component';
import { CheckListTemplateItemService } from './check-list-template-item.service';

@Component({
  selector: 'app-check-list-template-item',
  templateUrl: './check-list-template-item.component.html',
  styleUrls: ['./check-list-template-item.component.scss']
})
export class CheckListTemplateItemComponent implements OnInit {

  
  
  constructor(
    public route: ActivatedRoute,
    private service: CheckListTemplateItemService, 
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
    const dialogRef = this.dialog.open(CreateCheckListTemplateItemComponent, {
      width: '550px',
      data: {properties: this.properties, dataSource, check_list_template_default_id: this.id}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

      this.getDatasource();
    });
  }
  confirmDialog(dataSource?: any): void {
    const dialogRef = this.dialog.open(DeleteCheckListTemplateItemComponent, {
      width: '550px',
      data: {properties: this.properties, dataSource}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

      this.getDatasource();
    });
  }
}
