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
  templateUrl: './upcoming-movies.component.html',
  styleUrls: ['./upcoming-movies.component.css']
})
export class UpcomingMoviesComponent extends BaseComponent implements OnInit {
  upcomingMovies: Movie[] = [];
  isUserLoggedIn: Observable<boolean>;
  userId: Observable<string>;
  noMovies: Boolean;
  isLoading: Boolean = true;
  sortedByTitle: Boolean = false;
  sortedByRelease: Boolean = false;
  sortedByRating: Boolean = false;

  constructor(private movieService: UserService, private toastService: ToastService, authService: AuthenticationService, private router: Router) {
    super();
    this.isUserLoggedIn = authService.isUserLoggedIn();
    this.userId = authService.isUserId();
  }

  ngOnInit() {
    this.loadUpcomingMovies();
  }

  sortByTitle() {
    this.sortedByRelease = false;
    this.sortedByRating = false;
    if (this.sortedByTitle) {
      this.upcomingMovies.reverse();
      this.sortedByTitle = false;
      return;
    }

    this.upcomingMovies.sort(function (a, b) {
      var nameA = a.title.toLowerCase(), nameB = b.title.toLowerCase()
      if (nameA < nameB)
        return -1
      if (nameA > nameB)
        return 1
      return 0
    })

    this.sortedByTitle = true;
  }

  sortByRelease() {
    this.sortedByTitle = false;
    this.sortedByRating = false;
    if (this.sortedByRelease) {
      this.upcomingMovies.reverse();
      this.sortedByRelease = false;
      return;
    }

    this.upcomingMovies.sort(function (a, b) {
      var dateA = new Date(a.release_date), dateB = new Date(b.release_date)
      return dateA.getTime() - dateB.getTime()
    })

    this.sortedByRelease = true;
  }

  sortByRating() {
    this.sortedByTitle = false;
    this.sortedByRelease = false;
    if (this.sortedByRating) {
      this.upcomingMovies.reverse();
      this.sortedByRating = false;
      return;
    }

    this.upcomingMovies.sort(function (a, b) {
      return a.vote_average - b.vote_average
    })

    this.sortedByRating = true;
  }

  loadUpcomingMovies() {
    this.movieService.getUpcomingMovies()
      .pipe(takeUntil(this.unsubscribe)).subscribe(movies => {
        this.isLoading = false;
        this.noMovies = movies.length <= 0 ? true : false;
        this.upcomingMovies = movies;
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
        this.movieService.bookmarkMovie(movie).pipe(takeUntil(this.unsubscribe)).subscribe(() => {
          this.toastService.openSnackBar('Movie Bookmarked!', '', 'success-snackbar');
        });
      });
    });
  }
}

