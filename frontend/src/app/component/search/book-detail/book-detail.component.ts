import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth/auth.service';
import { SearchService } from '../../../service/search/search.service';
import { UserService } from '../../../service/user/user.service'

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {

  @Input() found: boolean = false;
  @Input() length: number = 0;
  currentBook: any;
  isAuth: boolean = false;

  constructor(private _searchService: SearchService, private _userService: UserService, private _authService : AuthService) {
      this.isAuth = _authService.isAuth;
  }

  ngOnInit(): void {
    this.currentBook = this._searchService.getChosenBook();
    this.isAuth = this._authService.isAuth;
    this._searchService.sub(this);
    // this._userService.sub(this);
    this._authService.sub(this);
  }

  setChosenBook(book: any){
    this.currentBook = book;
  }

  setIsAuth(value: boolean){
    this.isAuth = value;
  }





}
