import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class EmployeeService {
    constructor(private http: HttpClient) { }
    
    getCleanList() {

    }

    table = 'hotel';
    url = 'http://localhost:3001';
    propertiesUrl = ''

    getUsers(): any {
        let headers = { authorization: localStorage.getItem('authorization') || '', site_id: localStorage.getItem('site_id') || '' }
        return this.http.get(`http://localhost:3000/user/all`, { headers });
    }
}