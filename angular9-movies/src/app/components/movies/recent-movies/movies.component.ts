import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Movie } from 'src/app/models/movie.model';
import { UserService } from 'src/app/services/user.service';
import { ToastService } from 'src/app/services/toast.service';
import { BaseComponent } from '../../base/base.component';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-movies',
	templateUrl: './movies.component.html',
	styleUrls: ['./movies.component.css'],
})
export class MoviesComponent extends BaseComponent implements OnInit {
	requestingMovies: Movie[] = [];
	isUserLoggedIn: Observable<boolean>;
	userId: Observable<string>;
	noMovies: Boolean;
	isLoading = true;
	sortedByTitle = false;
	sortedByRelease = false;
	sortedByRating = false;

	constructor(
		private movieService: UserService,
		private toastService: ToastService,
		authService: AuthenticationService,
		private router: Router,
	) {
		super();
		this.isUserLoggedIn = authService.isUserLoggedIn();
		this.userId = authService.isUserId();
	}

	ngOnInit() {
		this.loadMovies();
	}

	sortByTitle() {
		this.sortedByRelease = false;
		this.sortedByRating = false;
		if (this.sortedByTitle) {
			this.requestingMovies.reverse();
			this.sortedByTitle = false;
			return;
		}

		this.requestingMovies.sort(function(a, b) {
			var nameA = a.title.toLowerCase(),
				nameB = b.title.toLowerCase();
			if (nameA < nameB) return -1;
			if (nameA > nameB) return 1;
			return 0;
		});

		this.sortedByTitle = true;
	}

	sortByRelease() {
		this.sortedByTitle = false;
		this.sortedByRating = false;
		if (this.sortedByRelease) {
			this.requestingMovies.reverse();
			this.sortedByRelease = false;
			return;
		}

		this.requestingMovies.sort(function(a, b) {
			var dateA = new Date(a.release_date),
				dateB = new Date(b.release_date);
			return dateA.getTime() - dateB.getTime();
		});

		this.sortedByRelease = true;
	}

	sortByRating() {
		this.sortedByTitle = false;
		this.sortedByRelease = false;
		if (this.sortedByRating) {
			this.requestingMovies.reverse();
			this.sortedByRating = false;
			return;
		}

		this.requestingMovies.sort(function(a, b) {
			return a.vote_average - b.vote_average;
		});

		this.sortedByRating = true;
	}

	loadMovies() {
		if (localStorage.getItem('recentMovies')) {
			this.isLoading = false;
			this.requestingMovies = JSON.parse(
				localStorage.getItem('recentMovies'),
			);
			return;
		}

		this.movieService
			.getRecentMovies()
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(movies => {
				localStorage.setItem('recentMovies', JSON.stringify(movies));
				this.isLoading = false;
				this.noMovies = movies.length <= 0 ? true : false;

				this.requestingMovies = movies;
			});
	}

	findMovies(key) {
		this.isLoading = true;
		this.movieService
			.findMovies(key)
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(movies => {
				this.isLoading = false;
				this.noMovies = movies.length <= 0 ? true : false;

				this.requestingMovies = movies;
			});
	}

	bookmarkMovie(movie) {
		this.isUserLoggedIn.subscribe(val => {
			if (!val) {
				this.router.navigate(['login']);
				return;
			}

			this.userId.subscribe(id => {
				movie.userId = id ? id : '';
				this.movieService
					.bookmarkMovie(movie)
					.pipe(takeUntil(this.unsubscribe))
					.subscribe(() => {
						this.toastService.openSnackBar(
							'Movie Bookmarked!',
							'',
							'success-snackbar',
						);
					});
			});
		});
	}
}
