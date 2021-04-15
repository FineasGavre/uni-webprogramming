import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs'

export interface Genre {
  id: number
  genre: string
}

export interface AllGenresResponse {
  data: Genre[]
}

@Injectable({
  providedIn: 'root'
})
export class GenresService {

  private static baseApiUrl = 'http://localhost:8080/genres'

  constructor(private http: HttpClient) { }

  getAllGenres(): Observable<AllGenresResponse> {
    return this.http.post<AllGenresResponse>(GenresService.baseApiUrl + '/index.php', null)
  }

  deleteGenre(id: number): void {
    const body = new URLSearchParams()
    body.set('id', String(id))

    this.http.post(GenresService.baseApiUrl + '/delete.php', body.toString(), {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    }).subscribe((result) => console.log(result))
  }

}
