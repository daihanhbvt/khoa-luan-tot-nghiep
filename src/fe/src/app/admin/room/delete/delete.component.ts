import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RoomService } from '../room.service';

@Component({
    selector: 'delete-room',
    templateUrl: 'delete.component.html',
    styleUrls: ['delete.component.scss']
})

export class DeleteRoomComponent implements OnInit {
    constructor(
        private service: RoomService,
        public dialogRef: MatDialogRef<DeleteRoomComponent>,
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