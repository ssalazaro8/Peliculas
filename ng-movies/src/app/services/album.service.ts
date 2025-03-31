import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MoviesModel } from '../models/movie.model';

@Injectable({
  providedIn: 'root',
})
export class AlbumService {
  URL: string = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}

  getMovies(): Observable<any> {
    return this.http.get<any>(this.URL + 'movie');
  }

  saveMovie(movie: MoviesModel): Observable<any> {
    return this.http.post<any>(this.URL + 'movie', movie);
  }

  updateMovies(movie: MoviesModel): Observable<any> {
    return this.http.put<any>(`${this.URL}movie/${movie.id}`, movie);
  }

  deleteMovies(id: number): Observable<any> {
    return this.http.delete<any>(`${this.URL}movie/${id}`);
  }
}