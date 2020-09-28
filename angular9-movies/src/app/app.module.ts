import { NgModule, ErrorHandler } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { APP_INITIALIZER } from '@angular/core';

import { AppConfig } from '../app/config/app.config';
import { AppMaterialDesignModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { GlobalErrorHandlerService } from './services/global-error-handler.service';
import { AuthenticationService } from './services/authentication.service';
import { JwtInterceptor } from './core/jwt.interceptor';
import { AuthGuard } from './core/auth.guard';

import { LoginComponent } from './components/user/login/login.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { RegisterComponent } from './components/user/register/register.component';
import { MoviesComponent } from './components/movies/recent-movies/movies.component';
import { BookmarkedMoviesComponent } from './components/movies/bookmarked-movies/bookmarked-movies.component';
import { UpcomingMoviesComponent } from './components/movies/upcoming-movies/upcoming-movies.component';
import { BaseComponent } from './components/base/base.component';
import { DemoDialogContentComponent } from './pages/demo/dialog/dialog';

import { DemoHomePageComponent } from './pages/home/page';
import { DemoDemoPageComponent } from './pages/demo/page';

export function initConfig(config: AppConfig) {
    return () => config.load();
}

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        RegisterComponent,
        LoginComponent,
        MoviesComponent,
        BookmarkedMoviesComponent,
        UpcomingMoviesComponent,
        BaseComponent,
        DemoDialogContentComponent,
        DemoHomePageComponent,
        DemoDemoPageComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AppMaterialDesignModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FlexLayoutModule,
    ],
    providers: [
        AppConfig,
        {
            provide: APP_INITIALIZER,
            useFactory: initConfig,
            deps: [AppConfig],
            multi: true,
        },
        GlobalErrorHandlerService,
        {
            provide: ErrorHandler,
            useClass: GlobalErrorHandlerService,
        },
        AuthGuard,
        AuthenticationService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptor,
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
