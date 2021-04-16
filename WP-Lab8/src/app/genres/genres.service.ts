import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs'

export interface Genre {
  id: string
  genre: string
}

export interface AllGenresResponse {
  data: Genre[]
}

@Injectable({
  providedIn: 'root'
})
export class GenresService {

  private static baseApiUrl = 'http://192.168.0.52:8080/genres'

  constructor(private http: HttpClient) { }

  getAllGenres(): Observable<AllGenresResponse> {
    return this.http.post<AllGenresResponse>(GenresService.baseApiUrl + '/index.php', null)
  }

  createGenre(genre: Genre): Observable<any> {
    const body = new URLSearchParams()
    body.set('genre_name', genre.genre)

    return this.http.post(GenresService.baseApiUrl + '/create.php', body.toString(), {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    })
  }

  deleteGenre(id: string): Observable<any> {
    const body = new URLSearchParams()
    body.set('id', id)

    return this.http.post(GenresService.baseApiUrl + '/delete.php', body.toString(), {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    })
  }

}
