import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomerService } from '../customer.service';

@Component({
    selector: 'create-customer',
    templateUrl: 'create.component.html',
    styleUrls: ['create.component.scss']
})

export class CreateCustomerComponent implements OnInit {
    constructor(
        private service: CustomerService,
        public dialogRef: MatDialogRef<CreateCustomerComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    onNoClick(): void {
        this.dialogRef.close();
    }
    dataSource: any;
    columns: any;
    properties: any;
    ngOnInit() {
        console.log(this.data);
        // get properites
        this.properties = this.data.properties;
        this.columns = Object.keys(this.data.properties);
        this.dataSource = this.data.dataSource || {};
        this.dataSource.hotel_id = this.data.id;
        console.log(this.dataSource)
        // set to form control
        // get relationship data

        this.columns.map((c: any) => {
            if (this.data.properties[c].relationship) {
                this.dataSource[c] = this.dataSource[this.data.properties[c]?.relationship?.replace('-','_')]?.id;
                this.service.getRel(this.data.properties[c].relationship)
                    .subscribe((res: any) => {
                        this.data.properties[c].datasource = res.data;
                        console.log(this.data.properties);
                    });
            }
        });
        // 

    }


    create() {
        console.log(this.dataSource);
        this.service.update(this.dataSource).subscribe(res => {
            this.dialogRef.close();
        })

    }
}