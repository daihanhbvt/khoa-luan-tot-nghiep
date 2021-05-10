import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HotelService } from '../hotel.service';

@Component({
    selector: 'delete-hotel',
    templateUrl: 'delete.component.html',
    styleUrls: ['delete.component.scss']
})

export class DeleteHotelComponent implements OnInit {
    constructor(
        private service: HotelService,
        public dialogRef: MatDialogRef<DeleteHotelComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit() { }

    delete() {
        this.service.delete(this.data.dataSource).subscribe(res => {
            this.dialogRef.close();
        })
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

}