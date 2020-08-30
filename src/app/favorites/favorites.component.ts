import { Component, OnInit } from '@angular/core';
import { Movie } from '../interfaces/movie';

@Component({
    selector   : 'app-favorites',
    templateUrl: './favorites.component.html',
    styleUrls  : ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

    localFavoriteMovies: Movie[] = JSON.parse(localStorage.getItem('favorite')) || [];
    totalPrice: number;
    localFavoriteMoviesId        = JSON.parse(localStorage.getItem('ids'));

    constructor() { }

    ngOnInit() {

        this.getTotalPrice();

    }

    // Delete 1 movie and update price
    deleteMovie(movie: Movie) {
        const findId = this.localFavoriteMovies.findIndex(e => e.id === movie.id);
        this.localFavoriteMovies.splice(findId, 1);
        this.getTotalPrice();
        localStorage.setItem('favorite', JSON.stringify(this.localFavoriteMovies));
        localStorage.setItem('ids', JSON.stringify(this.localFavoriteMoviesId));
        console.log(this.localFavoriteMovies);

    }

    // Calculating total
    getTotalPrice() {
        this.totalPrice = this.localFavoriteMovies.reduce((res, val) => res + val.price, 0);
    }

    // Clear all movies
    clearMovies() {
        localStorage.clear();
        this.localFavoriteMovies = [];
        this.getTotalPrice();
    }

}
