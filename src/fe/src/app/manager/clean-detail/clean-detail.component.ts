import { Component, OnInit } from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import { ActivatedRoute } from '@angular/router';
import { CleanDetailService } from './clean-detail.service';

@Component({
  selector: 'app-clean-detail',
  templateUrl: './clean-detail.component.html',
  styleUrls: ['./clean-detail.component.scss']
})
export class CleanDetailComponent implements OnInit {
  task: Task = {
    name: 'Indeterminate',
    completed: false,
    color: 'primary',
    subtasks: [
      {name: 'Dọn dẹp và lau bàn ghế', completed: true, color: 'primary'},
      {name: 'Thay ga và vỏ gối', completed: true, color: 'primary'},
      {name: 'Lau cửa sổ', completed: true, color: 'primary'},
      {name: 'Quét mạng nhện', completed: true, color: 'primary'},
      {name: 'Lau sàn nhà', completed: true, color: 'primary'},
      {name: 'Dọn dẹp phòng tắm', completed: true, color: 'primary'}
    ]
  };

  allComplete: boolean = false;

  constructor(
    public route: ActivatedRoute,
    private cleanDetailService: CleanDetailService,
    
  ) { }
  assignment: any;
  ngOnInit(): void {
    const aid = this.route.snapshot.paramMap.get("aid");
    this.cleanDetailService.getAssignmentDetail(aid).subscribe((res) => {
      this.assignment = res;
    })
  }
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


}
export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}

