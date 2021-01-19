import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { pipe, ReplaySubject } from 'rxjs';
import { environment } from '../../../environments/environment'

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    public authenticatedBehavior = new ReplaySubject(1);
    isAuth = false;
    observers: any[] = [];


    constructor(private _http: HttpClient) { }

    register(body: any) {
        return this._http.post(environment.API_URL + '/users/createAccount', body, {
            observe: 'body',
            headers: new HttpHeaders().append('Content-Type', 'application/json')
        });
    }

    login(body: any) {
        return this._http.post(environment.API_URL + '/users/login', body, {
            observe: 'body',
            withCredentials: true,
            headers: new HttpHeaders().append('Content-Type', 'application/json')
        });
    }

    logout() {
        return this._http.get(environment.API_URL + '/users/logout', {
            observe: 'body',
            withCredentials: true,
            headers: new HttpHeaders().append('Content-Type', 'application/json')
        })
    }

    authcheck() {
        var toreturn = this._http.get(environment.API_URL + '/users/check-auth');
        console.log(toreturn);
        return toreturn;
    }

    validateLogin() {
        this.isAuth = true;
        this.notifObservers();
    }
    validateLogout() {
        this.isAuth = false;
        this.notifObservers();
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

    notifObservers() {
        this.observers.forEach(obs => {
            obs.setIsAuth(this.isAuth);
        });
    }

}
