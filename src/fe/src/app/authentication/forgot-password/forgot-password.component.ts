import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})

export class ForgotPasswordComponent implements OnInit {
  username: string = "";
  password: string = "";
  
  //matcher = new MyErrorStateMatcher();

  
  constructor() { }

  ngOnInit(): void {
  }

}
