import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AssignmentService {
    constructor(private http: HttpClient) { }
     
    table = 'hotel';
    ide_hostname = "http://localhost:3000";
    hostname = "http://localhost:3001";
    url = 'http://localhost:3001/assignment';
    propertiesUrl = ''

    getCheckListTemplate(): any {
        let headers = { authorization: localStorage.getItem('authorization') || '', site_id: localStorage.getItem('site_id') || '' }
        return this.http.get(`${this.hostname}/check-list-template/all`, { headers });
    }

    getHotel(): any {
        let headers = { authorization: localStorage.getItem('authorization') || '', site_id: localStorage.getItem('site_id') || '' }
        return this.http.get(`${this.hostname}/hotel/all`, { headers });
    }
    getRel(table: string, hotelId?: string) {
        let headers = { authorization: localStorage.getItem('authorization') || '', site_id: localStorage.getItem('site_id') || '' }
        return this.http.get(`http://localhost:3001/${table}/all?floors_id=${hotelId}`, { headers });
    }
    getFloors(hotelId?: string): any {
        let headers = { authorization: localStorage.getItem('authorization') || '', site_id: localStorage.getItem('site_id') || '' }
        return this.http.get(`${this.hostname}/floors/all?hotel_id=${hotelId || ''}`, { headers });
    }

    getRoom(floorsId?: any): any {
        let headers = { authorization: localStorage.getItem('authorization') || '', site_id: localStorage.getItem('site_id') || '' }
        return this.http.get(`${this.hostname}/room/all?floors_id=${floorsId || ''}`, { headers });
    }

    getPublicArea(floorsId?: any): any {
        let headers = { authorization: localStorage.getItem('authorization') || '', site_id: localStorage.getItem('site_id') || '' }
        return this.http.get(`${this.hostname}/public-area/all?floors_id=${floorsId || ''}`, { headers });
    }
    getUsers(): any {
        let headers = { authorization: localStorage.getItem('authorization') || '', site_id: localStorage.getItem('site_id') || '' }
        return this.http.get(`${this.ide_hostname}/user/all`, { headers });
    }

    update(data: any) {
        let headers = {
            authorization: localStorage.getItem('authorization') || '',
            site_id: localStorage.getItem('site_id') || ''
        };
        return data.id ? this.http.put(`${this.url}/update/${data.id}`, data, { headers }) :
            this.http.post(`${this.url}/create`, data, { headers });
    }
    
}