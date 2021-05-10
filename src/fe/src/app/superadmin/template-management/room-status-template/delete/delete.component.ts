import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RoomStatusTemplateService } from '../room-status-template.service';

@Component({
    selector: 'delete-room-status-template',
    templateUrl: 'delete.component.html',
    styleUrls: ['delete.component.scss']
})

export class DeleteRoomStatusTemplateComponent implements OnInit {
    constructor(
        private service: RoomStatusTemplateService,
        public dialogRef: MatDialogRef<DeleteRoomStatusTemplateComponent>,
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