import { Component, OnInit } from '@angular/core'
import {Genre, GenresService} from '../../genres/genres.service'
import {FilesService} from '../files.service'
import {ActivatedRoute, Router} from '@angular/router'

export interface UpdateFileForm {
  id: string
  title: string
  format: string
  file_path: string
  genre_id: string
}

@Component({
  selector: 'app-edit-file',
  templateUrl: './edit-file.component.html',
  styleUrls: ['./edit-file.component.scss']
})
export class EditFileComponent implements OnInit {

  genres: Genre[]

  fileFormData: UpdateFileForm = {
    id: '',
    title: '',
    format: '',
    file_path: '',
    genre_id: ''
  }

  constructor(private genresService: GenresService,
              private filesService: FilesService,
              private router: Router,
              private route: ActivatedRoute) { }

  async ngOnInit(): Promise<void> {
    await this.fetchGenres()
    this.route.queryParams.subscribe((params) => {
      this.fileFormData.id = params.id
      this.fetchFileData()
    })
  }

  async fetchGenres(): Promise<void> {
    const response = await this.genresService.getAllGenres().toPromise()
    this.genres = response.data
  }

  fetchFileData(): void {
    this.filesService.getFileById(this.fileFormData.id)
      .toPromise().then((data) => {
        const file = data.data[0]

        this.fileFormData.title = file.title
        this.fileFormData.format = file.format
        this.fileFormData.file_path = file.file_path
        this.fileFormData.genre_id = file.genre_id
    })
  }

  saveFile(): void {
    this.filesService.updateFile(this.fileFormData)
      .toPromise().then(() => {
      this.router.navigateByUrl('files')
    })
  }

}
