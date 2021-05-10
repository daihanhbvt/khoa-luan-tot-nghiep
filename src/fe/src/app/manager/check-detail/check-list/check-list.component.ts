import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-manager-cd-check-list',
  templateUrl: './check-list.component.html',
  styleUrls: ['./check-list.component.scss']
})
export class CheckListCdComponent implements OnInit, OnChanges {
  task: Task = {
    name: 'Indeterminate',
    completed: false,
    color: 'primary',
    subtasks: [
      { name: 'Dọn dẹp và lau bàn ghế', completed: true, color: 'primary' },
      { name: 'Thay ga và vỏ gối', completed: true, color: 'primary' },
      { name: 'Lau cửa sổ', completed: true, color: 'primary' },
      { name: 'Quét mạng nhện', completed: true, color: 'primary' },
      { name: 'Lau sàn nhà', completed: true, color: 'primary' },
      { name: 'Dọn dẹp phòng tắm', completed: true, color: 'primary' }
    ]
  };

  allComplete: boolean = false;

  updateAllComplete() {
    this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
  }

  someComplete(): boolean {
    if (this.task.subtasks == null) {
      return false;
    }
    return this.task.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.task.subtasks == null) {
      return;
    }
    this.task.subtasks.forEach(t => t.completed = completed);
  }

  @Input() assignment: any;

  @Input() isClean: any;

  constructor(

  ) { }
  checkListItems: any = [];
  ngOnInit(): void {
   this.checkListItems = this.assignment?.checklist_templatecheckListItems.check_list_template_items || [];
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if(changes.assignment.currentValue) {

    }
  this.checkListItems = changes.assignment.currentValue?.checklist_template.check_list_template_items || [];
 
}
}


export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}



