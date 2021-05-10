import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class PublicAreaService {
    table = 'public_area';
    url = 'http://localhost:3001/public-area';
    propertiesUrl = ''
    constructor(private http: HttpClient) { }

    all(fid?: string): any {
        let headers = { authorization: localStorage.getItem('authorization') || '', site_id: localStorage.getItem('site_id') || '' }
        return this.http.get(`${this.url}/all?floors_id=${fid}`, { headers });
    }

    get(id: any): any {
        return this.http.get(`${this.url}/${id}`);
    }

    getProperties() {
        let headers = { authorization: localStorage.getItem('authorization') || '', site_id: localStorage.getItem('site_id') || '' }
        return this.http.get(`http://localhost:3001/table-properties/${this.table}`, { headers });
    }
    update(data: any) {
        let headers = {
            authorization: localStorage.getItem('authorization') || '',
            site_id: localStorage.getItem('site_id') || ''
        };
        return data.id ? this.http.put(`${this.url}/update/${data.id}`, data, { headers }) :
            this.http.post(`${this.url}/create`, data, { headers });
    }
    delete(data: any) {
        let headers = {
            authorization: localStorage.getItem('authorization') || '',
            site_id: localStorage.getItem('site_id') || ''
        };
        return this.http.delete(`${this.url}/delete/${data.id}`, { headers });
    }
    getRel(table: string) {
        let headers = { authorization: localStorage.getItem('authorization') || '', site_id: localStorage.getItem('site_id') || '' }
        return this.http.get(`http://localhost:3001/${table}/all`, { headers });
    }
}
