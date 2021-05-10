import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HotelService } from '../hotel.service';

@Component({
    selector: 'create-hotel',
    templateUrl: 'create.component.html',
    styleUrls: ['create.component.scss']
})

export class CreateHotelComponent implements OnInit {
    constructor(
        private service: HotelService,
        public dialogRef: MatDialogRef<CreateHotelComponent>,
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
        this.properties = this.data.properties.data.properties;
        this.columns = Object.keys(this.data.properties.data.properties);
        this.dataSource = this.data.dataSource || {};
        // set to form control



    }
    create() {
        console.log(this.dataSource);
        this.service.update(this.dataSource).subscribe(res => {
            this.dialogRef.close();
        })
       
    }
}