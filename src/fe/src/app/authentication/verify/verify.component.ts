import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VerifyService } from './verify.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {

  constructor(
    public route: ActivatedRoute,
    public service: VerifyService
  ) { }

  code: any;
  user: any = {};
  ngOnInit(): void {
    this.code = this.route.snapshot.paramMap.get('code');
    this.service.verify(this.code).subscribe((res: any) => {
      console.log(res);
      this.user = res;
    })
  }

  update() {
    if (this.user.password !== this.user.confPassword) {
      alert("Xác nhận mật khẩu không khớp");
      return;
    }
    else {
      this.service.updateUser(this.code, this.user).subscribe((res: any) => {
        console.log(res);
        if (res.id) {

          location.href = '/authentication/login'
        }
      })
    }
  }

}
