import { Injectable, SystemJsNgModuleLoader } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class SearchService {
	private chosenBook: any;
	observers: any[] = [];

	constructor(private _http: HttpClient) { }

	search(query: any): Observable<any> {
		return this._http.get<any[]>('http://127.0.0.1:3000/books/search' + '?' + query);
	}

	setChosenBook(book: any) {
		this.chosenBook = book;
		this.notifObservers();
	}

	getChosenBook() {
		return this.chosenBook;
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
			obs.setChosenBook(this.chosenBook);
		});
	}
}
