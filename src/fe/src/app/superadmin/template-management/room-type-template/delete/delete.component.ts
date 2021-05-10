import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RoomTypeTemplateService } from '../room-type-template.service';

@Component({
    selector: 'delete-room-type-template',
    templateUrl: 'delete.component.html',
    styleUrls: ['delete.component.scss']
})

export class DeleteRoomTypeTemplateComponent implements OnInit {
    constructor(
        private service: RoomTypeTemplateService,
        public dialogRef: MatDialogRef<DeleteRoomTypeTemplateComponent>,
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