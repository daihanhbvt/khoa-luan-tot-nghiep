import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class VerifyService {
    url = 'http://localhost:3000';
    propertiesUrl = ''
  constructor(private http: HttpClient) { }

  verify(code: any): any {
    return this.http.post(`${this.url}/user/verify/${code}`, {});
  }

  updateUser(code: any, user: any) {
    return this.http.post(`${this.url}/auth/init/${code}`, {user});
  }
 
}