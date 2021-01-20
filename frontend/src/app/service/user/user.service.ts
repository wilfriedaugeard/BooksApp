import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment'
@Injectable({
    providedIn: 'root'
})
export class UserService {
    observers: any[] = [];

    constructor(private _http: HttpClient) { }

    userInfo() {
        return this._http.get(environment.API_URL + '/users/userInfo', {
            observe: 'body',
            withCredentials: true,

        })
    }

    favList() {
        return this._http.get(environment.API_URL + '/users/favList', {
            observe: 'body',
            withCredentials: true,

        })
    }

    toReadList() {
        return this._http.get(environment.API_URL + '/users/toReadList', {
            observe: 'body',
            withCredentials: true,

        })
    }

    readList() {
        return this._http.get(environment.API_URL + '/users/readList', {
            observe: 'body',
            withCredentials: true,

        })
    }

    // Observateur
    sub(subscriber: any) {
        this.observers.push(subscriber);
    }
    unsub(subscriber: any) {
        const index = this.observers.indexOf(subscriber, 0);
        if (index > -1) {
            this.observers.splice(index, 1);
        }
    }


}
