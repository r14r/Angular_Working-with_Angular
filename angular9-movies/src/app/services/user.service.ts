import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AppConfig } from '../config/app.config';
import { UtilityService } from './utility.service';
import { Register } from '../models/register.model';
import { Movie } from '../models/movie.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    apiBaseURL = AppConfig.settings.apiServer.baseURL;

    constructor(private http: HttpClient, private header: UtilityService) { }

    register(newUser: Register): any {
        return this.http.post<Register>(this.apiBaseURL + 'users/register', newUser, this.header.requestHeaders()).pipe(res => {
            return res;
        });
    }

    getRecentMovies(): Observable<Movie[]> {
        return this.http.get<Movie[]>(this.apiBaseURL + 'movies/').pipe(res => {
            return res;
        });
    }

    getUpcomingMovies(): Observable<Movie[]> {
        return this.http.get<Movie[]>(this.apiBaseURL + 'movies/upcoming/movies').pipe(res => {
            return res;
        });
    }

    getBookmarkMovies(): Observable<Movie[]> {
        return this.http.get<Movie[]>(this.apiBaseURL + 'movies/bookmark/movies').pipe(res => {
            return res;
        });
    }

    findMovies(keyword: any): Observable<Movie[]> {
        return this.http.get<Movie[]>(this.apiBaseURL + 'movies/' + keyword).pipe(res => {
            return res;
        });
    }

    bookmarkMovie(movie: Movie): any {
        return this.http.post<Movie>(this.apiBaseURL + 'movies/bookmark', movie, this.header.requestHeaders()).pipe(res => {
            return res;
        });
    }
}
