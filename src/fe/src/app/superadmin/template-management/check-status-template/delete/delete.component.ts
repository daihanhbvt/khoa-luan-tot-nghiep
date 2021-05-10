import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CheckStatusTemplateService } from '../check-status-template.service';

@Component({
    selector: 'delete-check-status-template',
    templateUrl: 'delete.component.html',
    styleUrls: ['delete.component.scss']
})

export class DeleteCheckStatusTemplateComponent implements OnInit {
    constructor(
        private service: CheckStatusTemplateService,
        public dialogRef: MatDialogRef<DeleteCheckStatusTemplateComponent>,
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