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
        console.log(body);
        return this._http.put(environment.API_URL + '/users/favList', body, {
            observe: 'body',
            withCredentials: true,
            headers: new HttpHeaders().append('Content-Type', 'application/json')
        });
    }

    addToRead(body: any) {
        console.log(body);
        return this._http.put(environment.API_URL + '/users/readList', body, {
            observe: 'body',
            withCredentials: true,
            headers: new HttpHeaders().append('Content-Type', 'application/json')
        });
    }

    addToToRead(body: any) {
        console.log(body);
        return this._http.put(environment.API_URL + '/users/toReadList', body, {
            observe: 'body',
            withCredentials: true,
            headers: new HttpHeaders().append('Content-Type', 'application/json')
        });
    }

    deleteFav(id: any) {
        return this._http.delete(environment.API_URL + '/users/favList/'+ id, {
            observe: 'body',
            withCredentials: true,
            headers: new HttpHeaders().append('Content-Type', 'application/json')
        });
    }
 
    deleteRead(id: any) {
        return this._http.delete(environment.API_URL + '/users/readList/'+ id, {
            observe: 'body',
            withCredentials: true,
            headers: new HttpHeaders().append('Content-Type', 'application/json')
        });
    }

    deleteToRead(id: any) {
        return this._http.delete(environment.API_URL + '/users/toReadList/'+ id, {
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
