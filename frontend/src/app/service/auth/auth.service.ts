import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { pipe, ReplaySubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    public authenticatedBehavior = new ReplaySubject(1);
    isAuth = false;
    observers: any[] = [];


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

    logout() {
        return this._http.get('http://127.0.0.1:3000/users/logout', {
            observe: 'body',
            withCredentials: true,
            headers: new HttpHeaders().append('Content-Type', 'application/json')
        })
    }

    authcheck() {
        return this._http.get('http://127.0.0.1:3000/users/check-auth')
            .pipe(map((resp: any) => {
                this.isAuth = resp.authenticated;
                if (this.isAuth){
                    this.authenticatedBehavior.next(true);
                }
                else{
                    this.authenticatedBehavior.next(false);
                }
            }))
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
