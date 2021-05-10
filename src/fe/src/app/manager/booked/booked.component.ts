import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateBookComponent } from './create/create.component';
import { DeleteBookComponent } from './delete/delete.component';
import { BookedService } from './booked.service';

@Component({
  selector: 'app-book',
  templateUrl: './booked.component.html',
  styleUrls: ['./booked.component.scss']
})
export class BookedComponent implements OnInit {


  constructor(private service: BookedService, public dialog: MatDialog) {

  }

  hotels: any = [];
  

  ngOnInit(): void {
    //get table properties
    this.service.getProperties().subscribe((res: any) => {
      // change column display
      this.properties = res.data.properties;
      this.columnsToDisplay = Object.keys(res.data.properties)
        .filter((column: any) => !this.properties[column]?.expandable);
      this.columnsToDisplay.push('action');
      // this.columnsToDisplay = []; 
      let keys = Object.keys(res.data.properties);
      this.columnsToDisplay = keys
        .map(k => { return { key: k, index: this.properties[k].index } as { key: string, index: number } })
        .sort((a: any, b: any): any => {
          if (a.index < b.index) {
            return -1;
          }
          if (a.index > b.index) {
            return 1;
          }
          return 0;
        }).map((k: any) => k.key);

      console.log(this.columnsToDisplay)
      // .sort((a: any, b: any) => this.properties[a].index > this.properties[b].index);
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
    const dialogRef = this.dialog.open(CreateBookComponent, {
      width: '450px',
      data: { properties: this.properties, dataSource }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

      this.getDatasource();
    });
  }
  confirmDialog(dataSource?: any): void {
    const dialogRef = this.dialog.open(DeleteBookComponent, {
      width: '350px',
      data: { properties: this.properties, dataSource }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

      this.getDatasource();
    });
  }
}
