import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CheckListTemplateItemService } from '../check-list-template-item.service';

@Component({
    selector: 'delete-check-list-template-item',
    templateUrl: 'delete.component.html',
    styleUrls: ['delete.component.scss']
})

export class DeleteCheckListTemplateItemComponent implements OnInit {
    constructor(
        private service: CheckListTemplateItemService,
        public dialogRef: MatDialogRef<DeleteCheckListTemplateItemComponent>,
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