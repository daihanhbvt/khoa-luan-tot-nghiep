import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TablePropertiesService } from '../table-properties.service';

@Component({
    selector: 'delete-table-properties',
    templateUrl: 'delete.component.html',
    styleUrls: ['delete.component.scss']
})

export class DeleteTablePropertiesComponent implements OnInit {
    constructor(
        private service: TablePropertiesService,
        public dialogRef: MatDialogRef<DeleteTablePropertiesComponent>,
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