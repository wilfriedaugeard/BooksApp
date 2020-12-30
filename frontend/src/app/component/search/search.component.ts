import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SearchService } from '../../service/search/search.service'
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
    cpt: number = 0;
    waiting: boolean = false;
    found = true;
    length:number = 0;

    constructor(private route: ActivatedRoute, private _searchService: SearchService) { }

    ngOnInit() {
    }

    searchBooks() {
        this.waiting = true;
        let content = (this.model.content === '' || this.model.content === undefined) ? '' : 'name=' + this.model.content;
        let author = (this.model.author === undefined || this.model.author === '') ? '' : 'inauthor=' + this.model.author;
        let and='';
        if(!(content === '') && !(author === '')){
            and='&';
        }
        let query = content + and + author;
        console.log('query', query)
        this._searchService.search(query).subscribe(
            data => {
                this.books = data.items;
                if(this.books !== undefined){
                    if(this.books.length > 0){
                        this.found = true;
                        this.length = this.books.length;
                        this._searchService.setChosenBook(this.formatBook(this.books[0]));
                    }
                }else{
                    this.found = false;
                    this.length = 0
                }
            },
            err => {
                this.books = [];
                this.waiting = false;
                this.found = false;
            });
    }


    formatBook(data: any){
        const priceValue = (data.saleInfo.listPrice !== undefined) ? data.saleInfo.listPrice.amount : 'unknow';
        const currency = (data.saleInfo.listPrice !== undefined) ? data.saleInfo.listPrice.currencyCode : '';
        const price = priceValue+' '+currency;
        let formattedBook =
        {
            authors: data.volumeInfo.authors ? data.volumeInfo.authors : 'unknow',
            categories: data.volumeInfo.categories ? data.volumeInfo.categories : '',
            subtitle: data.volumeInfo.subtitle ? data.volumeInfo.subtitle : '',
            thumbnail: data.volumeInfo.thumbnail ? data.volumeInfo.thumbnail : 'unknow',
            title: data.volumeInfo.title ? data.volumeInfo.title : 'unknow',
            description: data.volumeInfo.description ? data.volumeInfo.description : 'Aucune description',
            pageCount: data.volumeInfo.pageCount ? data.volumeInfo.pageCount : 'unknow',
            publishedDate: data.volumeInfo.publishedDate ? data.volumeInfo.publishedDate : 'unknow',
            publisher: data.volumeInfo.publisher ? data.volumeInfo.publisher : 'unknow',
            industryIdentifiers: data.volumeInfo.industryIdentifiers ? data.volumeInfo.industryIdentifiers : 'unknow',
            price: price
        };
        return formattedBook;
    }

    chooseABook(book: any){
        this._searchService.setChosenBook(this.formatBook(book));
    }
}
