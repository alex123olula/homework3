import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesComponent } from './movies/movies.component';
import { FavoritesComponent } from './favorites/favorites.component';

const routes: Routes = [
    {
        path      : '',
        redirectTo: 'movies',
        pathMatch : 'full'
    },
    {
        path     : 'movies',
        component: MoviesComponent
    },
    {
        path     : 'favorite-movies',
        component: FavoritesComponent
    }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
