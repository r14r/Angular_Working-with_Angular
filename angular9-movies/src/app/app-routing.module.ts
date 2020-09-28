import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from '../app/components/user/register/register.component';
import { LoginComponent } from './components/user/login/login.component';
import { MoviesComponent } from './components/movies/recent-movies/movies.component';
import { BookmarkedMoviesComponent } from './components/movies/bookmarked-movies/bookmarked-movies.component';
import { UpcomingMoviesComponent } from './components/movies/upcoming-movies/upcoming-movies.component';

import { DemoDemoPageComponent } from './pages/demo/page';
import { DemoHomePageComponent } from './pages/home/page';

const routes: Routes = [
	{ path: '', component: MoviesComponent },
	{ path: 'register', component: RegisterComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'recent-movies', component: MoviesComponent },
	{ path: 'bookmarked-movies', component: BookmarkedMoviesComponent },
	{ path: 'upcoming-movies', component: UpcomingMoviesComponent },
	{ path: 'demo/home', component: DemoHomePageComponent },
	{ path: 'demo/demo', component: DemoDemoPageComponent },
	{ path: '**', redirectTo: '' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
	exports: [RouterModule],
	declarations: [],
})
export class AppRoutingModule {}
