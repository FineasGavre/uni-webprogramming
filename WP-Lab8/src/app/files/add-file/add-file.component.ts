import { Component, OnInit } from '@angular/core'
import {Genre, GenresService} from '../../genres/genres.service'
import {FilesService} from '../files.service'
import {Router} from '@angular/router'

export interface AddFileForm {
  title: string
  format: string
  file_path: string
  genre_id: string
}

@Component({
  selector: 'app-add-file',
  templateUrl: './add-file.component.html',
  styleUrls: ['./add-file.component.scss']
})
export class AddFileComponent implements OnInit {

  genres: Genre[]

  fileFormData: AddFileForm = {
    title: '',
    format: '',
    file_path: '',
    genre_id: ''
  }

  constructor(private genresService: GenresService, private filesService: FilesService, private router: Router) { }

  async ngOnInit(): Promise<void> {
    await this.fetchGenres()
  }

  async fetchGenres(): Promise<void> {
    const response = await this.genresService.getAllGenres().toPromise()
    this.genres = response.data

    if (this.genres.length !== 0) {
      this.fileFormData.genre_id = this.genres[0].id
    }
  }

  createFile(): void {
    this.filesService.createFile({ ...this.fileFormData, id: '' })
      .toPromise().then(() => {
        this.router.navigateByUrl('files')
      })
  }

}
