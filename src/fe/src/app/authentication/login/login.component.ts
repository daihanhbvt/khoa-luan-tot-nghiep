import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string = "";
  password: string = "";
  constructor(private authService: LoginService, private router: Router) { }

  ngOnInit(): void {
  }
  message: any;
  login(): void {
    console.log("login")
    const user = {username: this.username, password: this.password} ;
     this.authService.login(user).subscribe((res: any) => {
      if (res.access_token) {
        console.log(res);
        localStorage.setItem('authorization', res.access_token);
        localStorage.setItem('site_id', res.site_id);

        if(res.position === 'admin') {
          this.router.navigate(['./manager']);
        }if(res.position === 'manager') {
          this.router.navigate(['./manager']);
        }
      }
      this.message = res.message
      // this.router.navigate(['./landing']);
    });

  }
}
