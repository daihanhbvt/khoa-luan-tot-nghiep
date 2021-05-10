import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CleanService {
    table = 'clean';
    url = 'http://localhost:3001/clean';
    propertiesUrl = ''
    constructor(private http: HttpClient) { }

    all(): any {
        let headers = { authorization: localStorage.getItem('authorization') || '', site_id: localStorage.getItem('site_id') || '' }
        return this.http.get(`${this.url}/all`, { headers });
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
