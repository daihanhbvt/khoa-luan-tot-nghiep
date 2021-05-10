import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PublicAreaService } from '../public-area.service';

@Component({
    selector: 'delete-public-area',
    templateUrl: 'delete.component.html',
    styleUrls: ['delete.component.scss']
})

export class DeletePublicAreaComponent implements OnInit {
    constructor(
        private service: PublicAreaService,
        public dialogRef: MatDialogRef<DeletePublicAreaComponent>,
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