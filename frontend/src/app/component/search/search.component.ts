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
    books = [];
    cpt: number = 0;
    waiting: boolean = false;
    array = [];

    constructor(private route: ActivatedRoute, private _searchService: SearchService) { }

    ngOnInit() {
    }

    searchBooks() {
        console.log('coucou');
        this.waiting = true;
        let content = (this.model.content === "" || this.model.content === undefined) ? "" : "name=" + this.model.content;
        let author = (this.model.author === undefined || this.model.author === "") ? "" : "inauthor=" + this.model.author;
        let and='';
        if(!(this.model.content === "" || this.model.content === undefined) && !(this.model.author === undefined || this.model.author === "")){
            and='&';
        }
        let query = content + and + author;
        this._searchService.search(query).subscribe(
            data => {
                console.log(data)
            },
            err => {
                this.books = [];
                this.waiting = false;
            });
    }

}
