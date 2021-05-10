import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CheckListTemplateDefaultItemService } from '../service';

@Component({
    selector: 'delete-hotel',
    templateUrl: 'delete.component.html',
    styleUrls: ['delete.component.scss']
})

export class DeleteCheckListTemplateDefaultItemComponent implements OnInit {
    constructor(
        private service: CheckListTemplateDefaultItemService,
        public dialogRef: MatDialogRef<DeleteCheckListTemplateDefaultItemComponent>,
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