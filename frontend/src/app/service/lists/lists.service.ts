import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ListsService {
    private bookToSend: any;
    observers: any[] = [];

    constructor(private _http: HttpClient) { }

    addToFav(body: any) {
        // console.log(body);
        return this._http.put('http://127.0.0.1:3000/users/favList/put', body, {
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
