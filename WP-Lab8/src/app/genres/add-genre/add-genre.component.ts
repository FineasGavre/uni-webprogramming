import { Component, OnInit } from '@angular/core'
import {GenresService} from '../genres.service'
import {Router} from '@angular/router'

export interface AddGenreForm {
  genre_name: string
}

@Component({
  selector: 'app-add-genre',
  templateUrl: './add-genre.component.html',
  styleUrls: ['./add-genre.component.scss']
})
export class AddGenreComponent implements OnInit {

  genreFormData: AddGenreForm = {
    genre_name: ''
  }

  constructor(private genresService: GenresService, private router: Router) { }

  ngOnInit(): void {
  }

  createGenre(): void {
    this.genresService.createGenre({ id: '', genre: this.genreFormData.genre_name })
      .toPromise().then(() => {
        this.router.navigateByUrl('genres')
    })
  }

}
