import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomepageComponent } from './homepage/homepage.component';
import { UserlistsComponent } from './userlists/userlists.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from './service/user.service';
import { HttpClientModule } from '@angular/common/http';
import { SearchComponent } from './search/search.component';
@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        HomepageComponent,
        UserlistsComponent,
        SearchComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
    providers: [UserService],
    bootstrap: [AppComponent]
})
export class AppModule { }
