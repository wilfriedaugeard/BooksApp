import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment'

@Injectable({
    providedIn: 'root'
})
export class ListsService {
    private bookToSend: any;
    observers: any[] = [];

    constructor(private _http: HttpClient) { }

    addToFav(body: any) {
        return this._http.put(environment.API_URL + '/users/favList/put', body, {
            observe: 'body',
            withCredentials: true,
            headers: new HttpHeaders().append('Content-Type', 'application/json')
        });
    }

    addToRead(body: any) {
        return this._http.put(environment.API_URL + '/users/readList/put', body, {
            observe: 'body',
            withCredentials: true,
            headers: new HttpHeaders().append('Content-Type', 'application/json')
        });
    }

    addToToRead(body: any) {
        return this._http.put(environment.API_URL + '/users/toReadList/put', body, {
            observe: 'body',
            withCredentials: true,
            headers: new HttpHeaders().append('Content-Type', 'application/json')
        });
    }

    setBookToSend(book: any) {
        this.bookToSend = book;
        // console.log(book);
        this.notifObservers();
    }

    getBookToSend() {
        return this.bookToSend;
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
            obs.setBookToSend(this.bookToSend);
        });
    }

}
