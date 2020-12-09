import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private _http: HttpClient) { }

    register(body: any) {
        return this._http.post('http://127.0.0.1:3000/users/createAccount', body, {
            observe: 'body',
            headers: new HttpHeaders().append('Content-Type', 'application/json')
        });
    }

    login(body: any) {
        return this._http.post('http://127.0.0.1:3000/users/login', body, {
            observe: 'body',
            withCredentials: true,
            headers: new HttpHeaders().append('Content-Type', 'application/json')
        });
    }

    user() {
        return this._http.get('http://127.0.0.1:3000/users/user',{
            observe: 'body',
            withCredentials: true,
            headers: new HttpHeaders().append('Content-Type', 'application/json')
        })
    }
}
