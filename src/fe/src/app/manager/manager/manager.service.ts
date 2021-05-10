import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ManagerService {
    table = 'user';
    url = 'http://localhost:3000/user';
    propertiesUrl = ''
    constructor(private http: HttpClient) { }

    all(): any {
        let headers = { authorization: localStorage.getItem('authorization') || '', site_id: localStorage.getItem('site_id') || '' }
        return this.http.get(`${this.url}/all`, { headers });
    }

    me(): any {
        let headers = { authorization: localStorage.getItem('authorization') || '', site_id: localStorage.getItem('site_id') || '' }
        return this.http.post(`${this.url}/me`, {}, { headers });
    }
}
