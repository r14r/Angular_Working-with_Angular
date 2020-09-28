import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialDesignModule } from './app.material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AppHeaderComponent } from './components/header/component';
import { AppFooterComponent } from './components/footer/component';
import { AppSidemenuComponent } from './components/sidemenu/component';

@NgModule({
	declarations: [AppComponent, AppHeaderComponent, AppFooterComponent, AppSidemenuComponent],
	imports: [AppRoutingModule, BrowserModule, BrowserAnimationsModule, MaterialDesignModule],
	exports: [],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
