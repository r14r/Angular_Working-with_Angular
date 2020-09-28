import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Movie } from 'src/app/models/movie.model';
import { UserService } from 'src/app/services/user.service';
import { BaseComponent } from '../../base/base.component';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-movies',
  templateUrl: './bookmarked-movies.component.html',
  styleUrls: ['./bookmarked-movies.component.css']
})
export class BookmarkedMoviesComponent extends BaseComponent implements OnInit {
  bookmarkedMovies: Movie[] = [];
  userId: Observable<string>;
  noMovies: Boolean;
  isLoading: Boolean = true;
  sortedByTitle: Boolean = false;
  sortedByRelease: Boolean = false;
  sortedByRating: Boolean = false;

  constructor(private movieService: UserService, authService: AuthenticationService) {
    super();
    this.userId = authService.isUserId();
  }

  ngOnInit() {
    this.loadBookmarkedMovies();
  }

  sortByTitle() {
    this.sortedByRelease = false;
    this.sortedByRating = false;
    if (this.sortedByTitle) {
      this.bookmarkedMovies.reverse();
      this.sortedByTitle = false;
      return;
    }

    this.bookmarkedMovies.sort(function (a, b) {
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
      this.bookmarkedMovies.reverse();
      this.sortedByRelease = false;
      return;
    }

    this.bookmarkedMovies.sort(function (a, b) {
      var dateA = new Date(a.release_date), dateB = new Date(b.release_date)
      return dateA.getTime() - dateB.getTime()
    })

    this.sortedByRelease = true;
  }

  sortByRating() {
    this.sortedByTitle = false;
    this.sortedByRelease = false;
    if (this.sortedByRating) {
      this.bookmarkedMovies.reverse();
      this.sortedByRating = false;
      return;
    }

    this.bookmarkedMovies.sort(function (a, b) {
      return a.vote_average - b.vote_average
    })

    this.sortedByRating = true;
  }

  loadBookmarkedMovies() {
    this.movieService.getBookmarkMovies()
      .pipe(takeUntil(this.unsubscribe)).subscribe(movies => {
        this.isLoading = false;
        this.noMovies = movies.length <= 0 ? true : false;
        this.userId.subscribe(id => {
          movies.forEach(element => {
            if (element.userId === id) {
              this.bookmarkedMovies.push(element);
            }
          });
        });
      });
  }
}

