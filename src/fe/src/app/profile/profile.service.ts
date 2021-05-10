import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ProfileService {
    url = 'http://localhost:3000/profile';
    propertiesUrl = ''
  constructor(private http: HttpClient) { }
 
}