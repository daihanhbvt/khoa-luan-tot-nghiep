import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CleanStatusTemplateService } from '../clean-status-template.service';

@Component({
    selector: 'delete-clean-status-template',
    templateUrl: 'delete.component.html',
    styleUrls: ['delete.component.scss']
})

export class DeleteCleanStatusTemplateComponent implements OnInit {
    constructor(
        private service: CleanStatusTemplateService,
        public dialogRef: MatDialogRef<DeleteCleanStatusTemplateComponent>,
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