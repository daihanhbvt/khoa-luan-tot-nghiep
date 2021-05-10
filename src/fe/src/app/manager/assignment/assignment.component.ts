import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AssignmentService } from './assignment.service';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.scss']
})
export class AssignmentComponent implements OnInit {

  constructor(
    private service: AssignmentService,
    public dialog: MatDialog) { }
  floors: any = [];
  floorsId: any;

  hotels: any = [];
  hotelId: any;

  hours = [
    { value: "00:00", viewValue: "00:00" },
    { value: "00:15", viewValue: "00:15" },
    { value: "00:30", viewValue: "00:30" },
    { value: "00:45", viewValue: "00:45" },
    { value: "01:00", viewValue: "01:00" },
    { value: "01:15", viewValue: "01:15" },
    { value: "01:30", viewValue: "01:30" },
    { value: "01:45", viewValue: "01:45" },
    { value: "02:00", viewValue: "02:00" },
    { value: "02:15", viewValue: "02:15" },
    { value: "02:30", viewValue: "02:30" },
    { value: "02:45", viewValue: "02:45" },
    { value: "03:00", viewValue: "03:00" },
    { value: "03:15", viewValue: "03:15" },
    { value: "03:30", viewValue: "03:30" },
    { value: "03:45", viewValue: "03:45" },
    { value: "04:00", viewValue: "04:00" },
    { value: "04:15", viewValue: "04:15" },
    { value: "04:30", viewValue: "04:30" },
    { value: "04:45", viewValue: "04:45" },
    { value: "05:00", viewValue: "05:00" },
    { value: "05:15", viewValue: "05:15" },
    { value: "05:30", viewValue: "05:30" },
    { value: "05:45", viewValue: "05:45" },
    { value: "06:00", viewValue: "06:00" },
    { value: "06:15", viewValue: "06:15" },
    { value: "06:30", viewValue: "06:30" },
    { value: "06:45", viewValue: "06:45" },
    { value: "07:00", viewValue: "07:00" },
    { value: "07:15", viewValue: "07:15" },
    { value: "07:30", viewValue: "07:30" },
    { value: "07:45", viewValue: "07:45" },
    { value: "08:00", viewValue: "08:00" },
    { value: "08:15", viewValue: "08:15" },
    { value: "08:30", viewValue: "08:30" },
    { value: "08:45", viewValue: "08:45" },
    { value: "09:00", viewValue: "09:00" },
    { value: "09:15", viewValue: "09:15" },
    { value: "09:30", viewValue: "09:30" },
    { value: "09:45", viewValue: "09:45" },
    { value: "10:00", viewValue: "10:00" },
    { value: "10:15", viewValue: "10:15" },
    { value: "10:30", viewValue: "10:30" },
    { value: "10:45", viewValue: "10:45" },
    { value: "11:00", viewValue: "11:00" },
    { value: "11:15", viewValue: "11:15" },
    { value: "11:30", viewValue: "11:30" },
    { value: "11:45", viewValue: "11:45" },
    { value: "12:00", viewValue: "12:00" },
    { value: "12:15", viewValue: "12:15" },
    { value: "12:30", viewValue: "12:30" },
    { value: "12:45", viewValue: "12:45" },
    { value: "13:00", viewValue: "13:00" },
    { value: "13:15", viewValue: "13:15" },
    { value: "13:30", viewValue: "13:30" },
    { value: "13:45", viewValue: "13:45" },
    { value: "14:00", viewValue: "14:00" },
    { value: "14:15", viewValue: "14:15" },
    { value: "14:30", viewValue: "14:30" },
    { value: "14:45", viewValue: "14:45" },
    { value: "15:00", viewValue: "15:00" },
    { value: "15:15", viewValue: "15:15" },
    { value: "15:30", viewValue: "15:30" },
    { value: "15:45", viewValue: "15:45" },
    { value: "16:00", viewValue: "16:00" },
    { value: "16:15", viewValue: "16:15" },
    { value: "16:30", viewValue: "16:30" },
    { value: "16:45", viewValue: "16:45" },
    { value: "17:00", viewValue: "17:00" },
    { value: "17:15", viewValue: "17:15" },
    { value: "17:30", viewValue: "17:30" },
    { value: "17:45", viewValue: "17:45" },
    { value: "18:00", viewValue: "18:00" },
    { value: "18:15", viewValue: "18:15" },
    { value: "18:30", viewValue: "18:30" },
    { value: "18:45", viewValue: "18:45" },
    { value: "19:00", viewValue: "19:00" },
    { value: "19:15", viewValue: "19:15" },
    { value: "19:30", viewValue: "19:30" },
    { value: "19:45", viewValue: "19:45" },
    { value: "20:00", viewValue: "20:00" },
    { value: "20:15", viewValue: "20:15" },
    { value: "20:30", viewValue: "20:30" },
    { value: "20:45", viewValue: "20:45" },
    { value: "21:00", viewValue: "21:00" },
    { value: "21:15", viewValue: "21:15" },
    { value: "21:30", viewValue: "21:30" },
    { value: "21:45", viewValue: "21:45" },
    { value: "22:00", viewValue: "22:00" },
    { value: "22:15", viewValue: "22:15" },
    { value: "22:30", viewValue: "22:30" },
    { value: "22:45", viewValue: "22:45" },
    { value: "23:00", viewValue: "23:00" },
    { value: "23:15", viewValue: "23:15" },
    { value: "23:30", viewValue: "23:30" },
    { value: "23:45", viewValue: "23:45" }
  ];


  checkList: any = [];

  rooms: any = [];
  publicAreas: any = [];
  users: any = [];
  isLoadingRoom: any;
  isLoadingPublicArea: any;
  cleanDate: any = new Date();
  ngOnInit(): void {

    this.loadRooms();

    //get publicAreas
    this.loadPublicArea();
    // get hotel
    this.service.getHotel().subscribe((res: any) => {
      this.hotels = res.data;
    })
    // get floors 
    this.service.getFloors().subscribe((res: any) => {
      this.floors = res.data;
    })
    // get users
    this.service.getUsers().subscribe((res: any) => {
      this.users = res.data;
    })

    // get check-list-template
    this.service.getCheckListTemplate().subscribe((res: any) => {
      this.checkList = res.data;
    })
  }

  loadRooms() {
    this.isLoadingRoom = true;
    this.service.getRoom(this.floorsId).subscribe((res: any) => {
      // this.rooms = res.data;
      this.changeEmployeeSelected(res.data);

      this.isLoadingRoom = false;
      console.log(this.rooms)
    })
  }

  loadPublicArea() {

    this.isLoadingPublicArea = true;
    this.service.getPublicArea(this.floorsId).subscribe((res: any) => {
      this.publicAreas = res.data;
      this.isLoadingPublicArea = false;
      console.log(this.publicAreas)
    })
  }

  loadFloors() {
    this.service.getFloors(this.hotelId).subscribe((res: any) => {
      this.floors = res.data;
    })
  }
  employeeSelected: any;

  changeEmployee(room: any, supervisor: any) {
    room.assignment.supervisor = supervisor;
    room.assignment.supervisor_id = supervisor.id;
    console.log(room);
  }

  changeCleaner(room: any, employee: any) {

    console.log(room);
    room.assignment.employee_id = employee.id;
    room.assignment.employee = employee;
    console.log(room);

    // 
    this.save(room);
  }
  employeeSelectionChange(employee: any) {
    console.log("assignment employee " + employee.id);
    this.employeeSelected = employee;
    this.changeEmployeeSelected();
  }
  changeEmployeeSelected(rooms?: any) {
    let roomAssigns = rooms || this.rooms;
    roomAssigns.map((room: any) => {
      if (!room.assignments || room.assignments.length === 0) {
        room.assignment = {};
      } else {
        // set assignment
        room.assignment = room.assignments.find(
          (a: any) => a.employee_id && this.employeeSelected && a.employee_id === this.employeeSelected?.id) || {};

        // set time
        if (room.assignment && room.assignment.clean_date) {
          room.assignment.time = this.addZero(new Date(room.assignment.clean_date).getHours())
            + ":" + this.addZero(new Date(room.assignment.clean_date).getMinutes()) || undefined;
        }
      }

    });
    this.rooms = roomAssigns;
  }
  addZero(i: any) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

  nextDate() {
    this.cleanDate = new Date(this.cleanDate.setDate(this.cleanDate.getDate() + 1));
    this.changeEmployeeSelected();
  }

  preDate() {
    this.cleanDate = new Date(this.cleanDate.setDate(this.cleanDate.getDate() - 1));
    this.changeEmployeeSelected();
  }

  today() {
    this.cleanDate = new Date();
    this.changeEmployeeSelected();
  }

  setTime(room: any) {
    if(!room.assignment.clean_date) room.assignment.clean_date = new Date();
    room.assignment.clean_date = new Date(room.assignment.clean_date.setHours(+room.assignment.time.split(':')[0]));
    room.assignment.clean_date = new Date(room.assignment.clean_date.setMinutes(+room.assignment.time.split(':')[1]));
  }

  save(room: any) {
    // require employee_id
    // Requred hour
    if (room.assignment.time === undefined) {
      alert("Hãy lựa chọn thời gian thực hiện");
    } else if (room.assignment.employee_id === undefined) {
      alert("Hãy lựa chọn nhân viên dọn dẹp");
    } else if (room.assignment.supervisor_id === undefined) {
      alert("Hãy lựa chọn nhân viên kiểm tra");
    };
    room.assignment.room_id = room.id;
    console.log(room.assignment);
    this.service.update(room.assignment).subscribe(() => {
      this.loadRooms();
    })
  }

  openDialogHelp() {
    const dialogRef = this.dialog.open(DialogHelp);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  selector: 'dialog-help-dialog',
  templateUrl: 'dialog-help-dialog.html',
})
export class DialogHelp {
  
 }