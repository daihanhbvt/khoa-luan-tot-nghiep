import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CreateCustomerComponent } from './create/create.component';
import { DeleteCustomerComponent } from './delete/delete.component';
import { CustomerService } from './customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {


  constructor(
    public route: ActivatedRoute, private service: CustomerService, public dialog: MatDialog) {

  }
  id: any;
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    //get table properties
    this.service.getProperties().subscribe((res: any) => {
      // change column display
      this.properties = res.data.properties;
      this.columnsToDisplay = Object.keys(res.data.properties)
        .filter((column: any) => !this.properties[column]?.expandable);
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
openDialog(dataSource ?: any): void {
  const dialogRef = this.dialog.open(CreateCustomerComponent, {
    width: '450px',
    data: { properties: this.properties, dataSource, id: this.id }
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');

    this.getDatasource();
  });
}
confirmDialog(dataSource ?: any): void {
  const dialogRef = this.dialog.open(DeleteCustomerComponent, {
    width: '350px',
    data: { properties: this.properties, dataSource }
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');

    this.getDatasource();
  });
}
}
