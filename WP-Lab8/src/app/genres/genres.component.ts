import { Component, OnInit } from '@angular/core'
import { Genre, GenresService } from './genres.service'
import {Router} from '@angular/router'

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss']
})
export class GenresComponent implements OnInit {

  genres: Genre[]

  constructor(private genresService: GenresService, private router: Router) { }

  async ngOnInit(): Promise<void> {
    await this.fetchGenres()
  }

  async fetchGenres(): Promise<void> {
    const response = await this.genresService.getAllGenres().toPromise()
    this.genres = response.data
  }

  async deleteGenre(id: string): Promise<void> {
    await this.genresService.deleteGenre(id).toPromise()
    await this.fetchGenres()
  }

  sendToAddGenre(): void {
    this.router.navigateByUrl('genres/create')
  }

}
