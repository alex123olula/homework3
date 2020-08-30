import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../interfaces/movie';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MovieService {

    constructor(private http: HttpClient) { }

    getData(): Observable<Movie[]> {
        return this.http.get<Movie[]>('../../assets/movies.json');

    }

}
