import { Component, OnInit } from '@angular/core'
import {FilesService, MultimediaFile} from './files.service'
import {Genre, GenresService} from '../genres/genres.service'
import {Router} from '@angular/router'

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent implements OnInit {

  files: MultimediaFile[] = []
  genres: Genre[] = []

  genreFilterId = '0'

  constructor(private filesService: FilesService, private genresService: GenresService, private router: Router) { }

  async ngOnInit(): Promise<void> {
    this.retrieveFilterGenreIdFromLocalStorage()
    await this.fetchGenres()
    await this.fetchFiles()
  }

  async fetchFiles(): Promise<void> {
    const response = await this.filesService.getAllFiles().toPromise()
    this.files = response.data
  }

  async fetchGenres(): Promise<void> {
    const response = await this.genresService.getAllGenres().toPromise()
    this.genres = response.data
  }

  async deleteFile(id: string): Promise<void> {
    await this.filesService.deleteFile(id).toPromise()
    await this.fetchFiles()
  }

  retrieveFilterGenreIdFromLocalStorage(): void {
    const id = localStorage.getItem('filter_id')

    if (id === null) {
      localStorage.setItem('filter_id', '0')
      return
    }

    this.genreFilterId = id
  }

  saveFilterGenreIdToLocalStorage(id: string): void {
    localStorage.setItem('filter_id', id)
  }

  getFilteredFiles(): MultimediaFile[] {
    console.log('files: ', this.files)
    console.log('id: ', this.genreFilterId)

    if (this.genreFilterId === '0') {
      return this.files
    }

    return this.files.filter((multimediaFile) => {
      return multimediaFile.genre_id === this.genreFilterId
    })
  }

  getGenreNameFromGenreId(id: string): string {
    for (const genre of this.genres) {
      if (genre.id === id) {
        return genre.genre
      }
    }

    return 'Loading...'
  }

  sendToAddFile(): void {
    this.router.navigateByUrl('files/create')
  }

  sendToUpdateFile(id: string): void {
    this.router.navigateByUrl('files/update?id=' + id)
  }

}
