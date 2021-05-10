import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CheckDetailService {
    constructor(private http: HttpClient) { }

    table = 'hotel';
    hostname = "http://localhost:3001";
    url = 'http://localhost:3001';
    propertiesUrl = ''

    getAssignmentDetail(id: any) {
        let headers = { authorization: localStorage.getItem('authorization') || '', site_id: localStorage.getItem('site_id') || '' }
        return this.http.get(`${this.hostname}/assignment/get/${id}`, { headers });
    }
}