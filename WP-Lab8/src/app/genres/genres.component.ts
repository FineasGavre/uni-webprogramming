import { Component, OnInit } from '@angular/core'
import { Genre, GenresService } from './genres.service'

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss']
})
export class GenresComponent implements OnInit {

  genres: Genre[]

  constructor(private genresService: GenresService) { }

  ngOnInit(): void {
    this.fetchGenres()
  }

  fetchGenres(): void {
    this.genresService.getAllGenres().subscribe((response) => {
      this.genres = response.data
    })
  }

  deleteGenre(id: number): void {
    this.genresService.deleteGenre(id)
    this.fetchGenres()
  }

}
