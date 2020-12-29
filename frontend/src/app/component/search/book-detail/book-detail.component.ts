import { Component, Input, OnInit } from '@angular/core';
import { SearchService } from '../../../service/search/search.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {

  @Input() found: boolean = false;
  @Input() length: number = 0;
  currentBook: any;

  constructor(private _searchService: SearchService) { }

  ngOnInit(): void {
    this.currentBook = this._searchService.getChosenBook();
    this._searchService.sub(this);
  }

  setChosenBook(book: any){
    this.currentBook = book;
  }


}
