import { Injectable } from '@angular/core'
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {Observable} from 'rxjs'
import {Genre} from '../genres/genres.service'

export interface MultimediaFile {
  id: string
  genre_id: string
  title: string
  format: string
  file_path: string
}

export interface AllFilesResponse {
  data: MultimediaFile[]
}

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  private static baseApiUrl = 'http://192.168.0.52:8080/files/'

  constructor(private http: HttpClient) { }

  getAllFiles(): Observable<AllFilesResponse> {
    return this.http.post<AllFilesResponse>(FilesService.baseApiUrl + 'index.php', null)
  }

  getFileById(id: string): Observable<AllFilesResponse> {
    const body = new URLSearchParams()
    body.set('id', id)

    return this.http.post<AllFilesResponse>(FilesService.baseApiUrl + '/index.php', body.toString(), {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    })
  }

  createFile(multimediaFile: MultimediaFile): Observable<any> {
    const body = new URLSearchParams()
    body.set('title', multimediaFile.title)
    body.set('format', multimediaFile.format)
    body.set('file_path', multimediaFile.file_path)
    body.set('genre', multimediaFile.genre_id)

    return this.http.post(FilesService.baseApiUrl + '/create.php', body.toString(), {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    })
  }

  deleteFile(id: string): Observable<any> {
    const body = new URLSearchParams()
    body.set('id', id)

    return this.http.post(FilesService.baseApiUrl + '/delete.php', body.toString(), {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    })
  }

  updateFile(multimediaFile: MultimediaFile): Observable<any> {
    const body = new URLSearchParams()
    body.set('id', multimediaFile.id)
    body.set('title', multimediaFile.title)
    body.set('format', multimediaFile.format)
    body.set('file_path', multimediaFile.file_path)
    body.set('genre', multimediaFile.genre_id)

    return this.http.post(FilesService.baseApiUrl + '/update.php', body.toString(), {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    })
  }
}
