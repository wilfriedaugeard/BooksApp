import { Injectable, SystemJsNgModuleLoader } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

    constructor(private _http: HttpClient) { }

    search(query:any): Observable<any> {
        return this._http.get<any[]>('http://127.0.0.1:3000/books/search' +'?'+ query);
      }
}
