import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import * as jwt_decode from 'jwt-decode';

import { AppConfig } from '../config/app.config';
import { ToastService } from './toast.service';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    userAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
    userIdSubject = new BehaviorSubject<string>(this.hasId());
    apiBaseURL = AppConfig.settings.apiServer.baseURL;

    constructor(private http: HttpClient, private router: Router, private toastService: ToastService) { }

    private hasToken(): boolean {
        return !!localStorage.getItem('currentUser');
    }

    private hasId(): string {
        if (localStorage.getItem('currentUser')) {
            return JSON.parse(localStorage.getItem('currentUser'))._id;
        }
        return;
    }

    isUserLoggedIn(): Observable<boolean> {
        return this.userAuthenticatedSubject.asObservable();
    }

    isUserId(): Observable<string> {
        return this.userIdSubject.asObservable();
    }

    getToken() {
        if (localStorage.getItem('currentUser')) {
            return JSON.parse(localStorage.getItem('currentUser')).token;
        }
        return;
    }

    getDecodedToken(token: string): any {
        try {
            return jwt_decode(token);
        }
        catch (Error) {
            return null;
        }
    }

    getTokenExpirationDate(token: string): Date {
        const decodedToken = this.getDecodedToken(token);
        if (decodedToken.exp === undefined) return null;
        const date = new Date(0);
        date.setUTCSeconds(decodedToken.exp);
        return date;
    }

    isTokenExpired(): boolean {
        var token = this.getToken();
        if (!token) return true;

        const date = this.getTokenExpirationDate(token);
        if (date === undefined) return false;
        return !(date.valueOf() > new Date().valueOf());
    }

    login(email: string, password: string) {
        return this.http.post<any>(this.apiBaseURL + 'users/authenticate', { email: email, password: password })
            .pipe(map(user => {
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.userAuthenticatedSubject.next(true);
                    this.userIdSubject.next(user._id);
                }

                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.userAuthenticatedSubject.next(false);
        this.userIdSubject.next('');
        this.router.navigate(['/recent-movies']);
        this.toastService.openSnackBar("You have been Logout Successfully!", '', 'success-snackbar');
    }
}