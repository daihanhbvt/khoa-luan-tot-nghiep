import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ScheduleJobService {
    constructor(private http: HttpClient) { }

    getCleanList() {

    }
    table = 'hotel';
    hostname = "http://localhost:3001";
    url = 'http://localhost:3001';
    propertiesUrl = ''

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
    getClean(): any {
        let headers = { authorization: localStorage.getItem('authorization') || '', site_id: localStorage.getItem('site_id') || '' }
        return this.http.get(`${this.url}/clean/all`, { headers });
    }
    getCleanStatus(): any {
        let headers = { authorization: localStorage.getItem('authorization') || '', site_id: localStorage.getItem('site_id') || '' }
        return this.http.get(`${this.url}/clean-status/all`, { headers });
    }
    getpublicArea(): any {
        let headers = { authorization: localStorage.getItem('authorization') || '', site_id: localStorage.getItem('site_id') || '' }
        return this.http.get(`${this.url}/public-area/all`, { headers });
    }
    getRoom(floorsId?: any): any {
        let headers = { authorization: localStorage.getItem('authorization') || '', site_id: localStorage.getItem('site_id') || '' }
        return this.http.get(`${this.url}/room/all?floors_id=${floorsId || ''}`, { headers });
    }
    getRoomStatus(): any {
        let headers = { authorization: localStorage.getItem('authorization') || '', site_id: localStorage.getItem('site_id') || '' }
        return this.http.get(`${this.url}/room-status/all`, { headers });
    }
    getRoomType(): any {
        let headers = { authorization: localStorage.getItem('authorization') || '', site_id: localStorage.getItem('site_id') || '' }
        return this.http.get(`${this.url}/room-type/all`, { headers });
    }
    getCustomer(): any {
        let headers = { authorization: localStorage.getItem('authorization') || '', site_id: localStorage.getItem('site_id') || '' }
        return this.http.get(`${this.url}/customer/all`, { headers });
    }
    getCheckStatus(): any {
        let headers = { authorization: localStorage.getItem('authorization') || '', site_id: localStorage.getItem('site_id') || '' }
        return this.http.get(`${this.url}/check-status/all`, { headers });
    }
    getUsers(): any {
        let headers = { authorization: localStorage.getItem('authorization') || '', site_id: localStorage.getItem('site_id') || '' }
        return this.http.get(`http://localhost:3000/user/all`, { headers });
    }

}