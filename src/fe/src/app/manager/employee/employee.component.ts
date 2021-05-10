import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-manager-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  @Output() employeeSelectionChanged = new EventEmitter<any>();
  constructor(private service: EmployeeService) { }
  employees: any = [];
  employeeSelected:any;
  ngOnInit(): void {

    this.service.getUsers().subscribe((res: any) => {
      this.employees = res.data;
    })
  }
  selectionChange(e: any) {
    // console.log('employeeSelected' + e.option._value);
    //console.log('employeeSelected' + this.employeeSelected);
    // emit, output ra 1 sự kiện change
    this.employeeSelectionChanged.emit(e.option._value);
  }
}
