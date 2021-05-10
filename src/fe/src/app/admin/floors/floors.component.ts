import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CreateFloorsComponent } from './create/create.component';
import { DeleteFloorsComponent } from './delete/delete.component';
import { FloorsService } from './floors.service';

@Component({
  selector: 'app-floors',
  templateUrl: './floors.component.html',
  styleUrls: ['./floors.component.scss']
})
export class FloorsComponent implements OnInit {

  
  constructor(
    public route: ActivatedRoute,private service: FloorsService, public dialog: MatDialog) {

  }
  id: any;
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    //get table properties
    this.service.getProperties().subscribe((res: any) => {
      // change column display
      this.properties = res.data.properties;
      this.columnsToDisplay = Object.keys(res.data.properties);
      this.columnsToDisplay.push('action');
    })
   
    this.getDatasource(this.id);
  }

  getDatasource(hid?: string) {
 // set datasource
 this.service.all(hid).subscribe((res: any) => {
  this.dataSource = res.data;
})
  }

  dataSource: any;
  columnsToDisplay: any;
  expandedElement: any | null | undefined;
  properties: any;
  openDialog(dataSource?: any): void {
    const dialogRef = this.dialog.open(CreateFloorsComponent, {
      width: '450px',
      data: {properties: this.properties, dataSource, id: this.id}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

      this.getDatasource(this.id);
    });
  }
  confirmDialog(dataSource?: any): void {
    const dialogRef = this.dialog.open(DeleteFloorsComponent, {
      width: '350px',
      data: {properties: this.properties, dataSource}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

      this.getDatasource(this.id);
    });
  }
}
