import { Component, OnInit } from '@angular/core';
import { AdminService } from './admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  isShowCategoryMenu = true;
  constructor(
    private service: AdminService
  ) { }
  user: any;
  ngOnInit(): void {
    this.service.me().subscribe((res: any) => {
      this.user = res;
      console.log(this.user);
      
    })
  }

}
