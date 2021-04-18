import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GenresComponent } from './genres/genres.component';
import { FilesComponent } from './files/files.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { HeadingComponent } from './components/heading/heading.component';
import {FormsModule} from '@angular/forms';
import { AddGenreComponent } from './genres/add-genre/add-genre.component';
import { AddFileComponent } from './files/add-file/add-file.component';
import { EditFileComponent } from './files/edit-file/edit-file.component';

@NgModule({
  declarations: [
    AppComponent,
    GenresComponent,
    FilesComponent,
    NavbarComponent,
    HeadingComponent,
    AddGenreComponent,
    AddFileComponent,
    EditFileComponent
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
