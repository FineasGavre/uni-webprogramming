import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { FilesComponent } from './files/files.component'
import { GenresComponent } from './genres/genres.component'
import {AddGenreComponent} from './genres/add-genre/add-genre.component'
import {AddFileComponent} from './files/add-file/add-file.component'
import {EditFileComponent} from './files/edit-file/edit-file.component'

const routes: Routes = [
  { path: 'files', component: FilesComponent },
  { path: 'files/create', component: AddFileComponent },
  { path: 'files/update', component: EditFileComponent },
  { path: 'genres', component: GenresComponent },
  { path: 'genres/create', component: AddGenreComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
