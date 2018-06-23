import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import { AppComponent } from './app.component';
import { BookComponent } from './components/book/book.component';
import {RouterModule, Routes} from "@angular/router";
import { BookListComponent } from './components/book-list/book-list.component';
import { BookEditComponent } from './components/book-edit/book-edit.component';

const routes: Routes = [
  { path: 'books/:title', component: BookComponent },
  { path: 'books/:title/edit', component: BookEditComponent },
  { path: 'books', component: BookListComponent },
  {
    path: '',
    redirectTo: 'books/',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    BookListComponent,
    BookEditComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
