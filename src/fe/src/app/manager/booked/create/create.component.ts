import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BookedService } from '../booked.service';

@Component({
    selector: 'create-booked',
    templateUrl: 'create.component.html',
    styleUrls: ['create.component.scss']
})

export class CreateBookComponent implements OnInit {
    constructor(
        private service: BookedService,
        public dialogRef: MatDialogRef<CreateBookComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

    hotels: any = [];
    hotelId: any;

    floors: any = [];
    floorsId: any;
    
    dataSource: any;
    columns: any;
    properties: any;
    ngOnInit() {
        // load hotel
        console.log("Load hotels");
        this.service.getHotel().subscribe((res: any) => {
            this.hotels = res.data;
        });

        console.log(this.data);
        // get properites
        this.properties = this.data.properties;
        this.columns = Object.keys(this.properties)
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
        this.dataSource = this.data.dataSource || {};
        console.log(this.dataSource)
        // set to form control
        // get relationship data

        this.loadRef();
        // 

    }

    loadRef( ) {
        console.log("selectionChange");
        // load option
        this.columns.map((c: any) => {
            if (this.data.properties[c].relationship) {
                this.dataSource[c] = this.dataSource[this.data.properties[c]?.relationship?.replace('-', '_')]?.id;
                this.service.getRel(this.data.properties[c].relationship, this.floorsId)
                    .subscribe((res: any) => {
                        this.data.properties[c].datasource = res.data;
                        console.log(this.data.properties);
                    });
            }
        });
    }

    loadFloors() {
        this.service.getFloors(this.hotelId).subscribe((res:any) => {
            this.floors = res.data;
        })
    }
    create() {
        console.log(this.dataSource);
        this.service.update(this.dataSource).subscribe(res => {
            this.dialogRef.close();
        })

    }
 
}