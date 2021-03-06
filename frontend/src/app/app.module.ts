import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { HomepageComponent } from './component/homepage/homepage.component';
import { UserlistsComponent } from './component/userlists/userlists.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from './service/user/user.service';
import { HttpClientModule } from '@angular/common/http';
import { SearchComponent } from './component/search/search.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { SearchService } from './service/search/search.service';
import { BookDetailComponent } from './component/search/book-detail/book-detail.component';
import { AuthService } from './service/auth/auth.service';
import { AuthGuard } from './service/auth/auth.guard';
import { ListsService } from './service/lists/lists.service';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        HomepageComponent,
        UserlistsComponent,
        SearchComponent,
        NavbarComponent,
        BookDetailComponent,
    ],
    imports: [
        CommonModule,
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
    providers: [UserService, SearchService, AuthService, AuthGuard, ListsService],
    bootstrap: [AppComponent]
})
export class AppModule { }
