import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ListsService {
    private bookToSend: any;
    observers: any[] = [];

    constructor(private _http: HttpClient) { }

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
