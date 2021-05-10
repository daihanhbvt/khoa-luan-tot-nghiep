import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class LoginService {
  constructor(private http: HttpClient) { }

  login(user: any): any {
    return this.http.post('http://localhost:3000/auth/login', user);
  }
 
}
