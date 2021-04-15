import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilesComponent } from './files/files.component';
import { GenresComponent } from './genres/genres.component';

const routes: Routes = [
  { path: 'files', component: FilesComponent },
  { path: 'genres', component: GenresComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
