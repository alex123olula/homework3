import { Component, Injectable, Input, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { Movie } from '../interfaces/movie';
import { from } from 'rxjs';
import { scan } from 'rxjs/operators';

@Component({
    selector   : 'app-movies',
    templateUrl: './movies.component.html',
    styleUrls  : ['./movies.component.scss'],
    providers  : [MovieService]
})
@Injectable()
export class MoviesComponent implements OnInit {

    movies: Movie[]         = [];
    favoriteMovies: Movie[] = [];
    idS                     = [];
    localFavoriteMovies     = JSON.parse(localStorage.getItem('favorite')) || [];
    localFavoriteId         = JSON.parse(localStorage.getItem('ids'));
    // Streaming local storage and concat all data to one array.
    stream$                 = from(this.localFavoriteMovies).pipe(
        scan((acc, v) => acc.concat(v), [])
    );

    constructor(private movieService: MovieService) {}

    ngOnInit() {
        // Getting movies from json
        this.movieService.getData().subscribe(movies => this.movies = movies);
        // Checking if localstorage not clear if not updating data from there
        this.stream$.subscribe(val => {
            if (val !== null) {
                this.idS            = this.localFavoriteId;
                this.favoriteMovies = this.localFavoriteMovies;
            }
        });
        this.setId();

    }

    // Set item to localstorage.
    addToFavorite(movie: Movie) {
        localStorage.setItem('favorite', JSON.stringify(this.favoriteMovies));
    }

    // Checking if movie in favorites and add movie to favorites if its already on favorite remove it.
    isMovieFavorite(movie: Movie) {
        const findId = this.favoriteMovies.findIndex(e => e.id === movie.id);
        if (findId < 0) {
            this.favoriteMovies.push(movie);

        } else {
            this.favoriteMovies.splice(findId, 1);
        }
        this.addToFavorite(movie);
    }

    // Taking id of the favorite movies
    setId() {
        this.idS = this.favoriteMovies.map(e => e.id);
        localStorage.setItem('ids', JSON.stringify(this.idS));
    }
}





