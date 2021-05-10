import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CheckListTemplateItemService } from '../check-list-template-item.service';

@Component({
    selector: 'create-check-list-template-item',
    templateUrl: 'create.component.html',
    styleUrls: ['create.component.scss']
})

export class CreateCheckListTemplateItemComponent implements OnInit {
    constructor(
        private service: CheckListTemplateItemService,
        public dialogRef: MatDialogRef<CreateCheckListTemplateItemComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    onNoClick(): void {
        this.dialogRef.close();
    }
    dataSource: any;
    columns: any;
    properties: any;
    ngOnInit() {
        console.log(this.data);
        // get properites
        this.properties = this.data.properties;
        this.columns = Object.keys(this.data.properties);
        this.dataSource = this.data.dataSource || {};
        console.log(this.dataSource)
        // set to form control

        this.columns.map((c: any) => {
            if (this.data.properties[c].relationship) {
                this.dataSource[c] = this.dataSource[this.data.properties[c]?.relationship?.replace('-','_')]?.id;
                this.service.getRel(this.data.properties[c].relationship)
                    .subscribe((res: any) => {
                        this.data.properties[c].datasource = res.data;
                        console.log(this.data.properties);
                    });
            }
        });

    }
    create() {
        console.log(this.dataSource);
        this.service.update(this.dataSource).subscribe(res => {
            this.dialogRef.close();
        })
       
    }
}