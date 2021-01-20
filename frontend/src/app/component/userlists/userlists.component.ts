import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';
import { ListsService } from 'src/app/service/lists/lists.service';
import { UserService } from '../../service/user/user.service';

@Component({
    selector: 'app-userlists',
    templateUrl: './userlists.component.html',
    styleUrls: ['./userlists.component.scss']
})
export class UserlistsComponent implements OnInit {

    userName = '';
    welcomeMessage = '';
    bookToSend: any;
    favsList: any[] = [];
    readsList: any[] = [];
    toReadsList: any[] = [];
    currentBook: any;


    constructor(private _router: Router,
        private _userService: UserService,
        private _authService: AuthService,
        private _listsService: ListsService) {

        this._userService.userInfo()
            .subscribe(
                data => { console.log(data); this.name(data); },
                error => this._router.navigate(['/login'])
            );

    }



    ngOnInit(): void {
        this.allList();
        this.bookToSend = this._listsService.getBookToSend();
        this._listsService.sub(this);
    }


    favList(): void {
        this._userService.favList()
            .subscribe(
                (data: any) => {
                    console.log(data);
                    this.favsList = data.books;
                    console.log(this.favsList);
                },
                error => console.error(error))
    }

    toReadList(): void {
        this._userService.toReadList()
            .subscribe(
                (data: any) => {
                    console.log(data);
                    this.toReadsList = data.books;
                    console.log(this.readsList);
                },
                error => console.error(error))

    }

    readList(): void {
        this._userService.readList()
            .subscribe(
                (data: any) => {
                    console.log(data);
                    this.readsList = data.books;
                    console.log(this.toReadsList);
                },
                error => console.error(error))

    }

    allList(): void {
        this.readList();
        this.favList();
        this.toReadList();
    }

    deleteFav(book: any): void {
        console.log('ok');
        this._listsService.deleteFav(book._id).subscribe(
            data => {
                console.log(data);
                this.favList();
            },
            error => {
                console.log(error);
            }
        )
    }

    deleteRead(book: any): void {
        this._listsService.deleteRead(book._id).subscribe(
            data => {
                console.log(data);
                this.readList();
            },
            error => {
                console.log(error);
            }
        )
    }

    deleteToRead(book: any): void {
        this._listsService.deleteToRead(book._id).subscribe(
            data => {
                console.log(data);
                this.toReadList();
            },
            error => {
                console.log(error);
            }
        )
    }

    addToFav(book: any): any {
        this._listsService.addToFav(JSON.stringify(book))
            .subscribe(
                data => {
                    this.allList();
                },
                error => {
                    console.log(error);
                }
            );
        return;
    }

    addToRead(book: any): any {
        this._listsService.addToRead(JSON.stringify(book))
            .subscribe(
                data => {
                    this.allList();
                },
                error => {
                    console.log(error);
                }
            );
        return;
    }
    addToToRead(book: any): any {
        this._listsService.addToToRead(JSON.stringify(book))
            .subscribe(
                data => {
                    this.allList();
                },
                error => {
                    console.log(error);
                }
            );
        return;
    }

    setBookToSend(book: any): void {
        this.bookToSend = book;
    }

    name(data: any): void {
        this.userName = data.username;
    }

    get getName(): string {
        return this.userName;
    }

    formatBook(data: any): any {
        if (!data) { console.log('nodata'); return; }
        const maxsize = 50;
        const priceValue = (data.saleInfo.listPrice !== undefined && data.saleInfo.listPrice > 0) ? data.saleInfo.listPrice.amount : 'unknow';
        const currency = (data.saleInfo.listPrice !== undefined && priceValue !== 'unknow') ? data.saleInfo.listPrice.currencyCode : '';
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

    onClick(book: any): void {
        this.currentBook = this.formatBook(book);
    }

}
