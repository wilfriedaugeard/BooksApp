import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ListsService } from 'src/app/service/lists/lists.service';
import { SearchService } from '../../service/search/search.service';
import { Location } from '@angular/common';
@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
    model = {
        content: '',
        author: '',
    };
    books: any[] = [];
    booksFormat: any[] = [];
    cpt: number = 0;
    waiting: boolean = false;
    found = true;
    length: number = 0;
    searching: boolean = false;


    constructor(private route: ActivatedRoute, private _searchService: SearchService, private _listService: ListsService, private _location: Location) { }

    ngOnInit() {

    }

    searchBooks() {
        this.books = []
        this.booksFormat = []
        this.found = false;
        this.searching = true;
        this.waiting = true;
        let content = (this.model.content === '' || this.model.content === undefined) ? '' : 'name=' + this.model.content;
        let author = (this.model.author === undefined || this.model.author === '') ? '' : 'inauthor=' + this.model.author;
        let and = '';
        if (!(content === '') && !(author === '')) {
            and = '&';
        }
        let query = content + and + author;
        console.log('query', query)
        let state = 'search?' + query;
        this._location.replaceState(state);
        history.pushState(null, "Recherche:" + query, state);
        this._searchService.search(query).subscribe(
            data => {
                this.books = data.items;
                console.log(this.books)
                if (this.books !== undefined) {
                    if (this.books.length > 0) {
                        this.booksFormat = this.books.map(book => this.formatBook(book))
                        this.found = true;
                        this.length = this.books.length;
                        this._searchService.setChosenBook(this.booksFormat[0]);
                        this._listService.setBookToSend(this.books[0]);
                        this.searching = false;
                    }
                } else {
                    this.found = false;
                    this.length = 0
                    this.searching = false;
                }
                this.waiting = false;
                console.log(this.books);
            },
            err => {
                this.books = [];
                this.waiting = false;
                this.found = false;
                this.searching = false;
                console.log(err.error);
            });
    }


    formatBook(data: any) {
        if (!data) { console.log("nodata"); return };
        const maxsize = 50;
        const priceValue = (data.saleInfo.listPrice !== undefined) ? data.saleInfo.listPrice.amount : 'unknow';
        const currency = (data.saleInfo.listPrice !== undefined) ? data.saleInfo.listPrice.currencyCode : '';
        const price = priceValue + ' ' + currency;
        const title = data.volumeInfo.title ? data.volumeInfo.title : 'unknow';
        const recommendationList = data.recommendationList ? data.recommendationList.map((book: any) => this.formatBook(book)) : [];
        let formattedBook =
        {
            authors: data.volumeInfo.authors ? data.volumeInfo.authors : 'unknow',
            categories: data.volumeInfo.categories ? data.volumeInfo.categories : '',
            subtitle: data.volumeInfo.subtitle ? data.volumeInfo.subtitle : '',
            thumbnail: data.volumeInfo.thumbnail ? data.volumeInfo.thumbnail : 'unknow',
            title: title,
            title_preview: (title.length < maxsize) ? title : title.substring(0, 50) + '...',
            description: data.volumeInfo.description ? data.volumeInfo.description : 'Aucune description',
            pageCount: data.volumeInfo.pageCount ? data.volumeInfo.pageCount : 'unknow',
            publishedDate: data.volumeInfo.publishedDate ? data.volumeInfo.publishedDate : 'unknow',
            publisher: data.volumeInfo.publisher ? data.volumeInfo.publisher : 'unknow',
            industryIdentifiers: data.volumeInfo.industryIdentifiers ? data.volumeInfo.industryIdentifiers : 'unknow',
            price: price,
            recommendationList: recommendationList
        };
        return formattedBook;
    }

    chooseABook(bookFormat: any, bookToSend: any) {
        this._searchService.setChosenBook(bookFormat);
        this._listService.setBookToSend(bookToSend);
    }
}
