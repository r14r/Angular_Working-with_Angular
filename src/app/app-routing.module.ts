import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePageComponent } from './pages/home/page';
import { DemoPageComponent } from './pages/demo/page';

import { LoginPageComponent } from './blocks/customer/pages/login/component';

import { MaterialFormDemoPageComponent } from './blocks/material/pages/form/component';
import { CustomerListComponent } from './blocks/customer/pages/list/component';
import { CustomerCreateComponent } from './blocks/customer/pages/create/component';

const routes: Routes = [
	{ path: '', redirectTo: '/login', pathMatch: 'full' },

	{ path: 'home', component: HomePageComponent },
	{ path: 'demo', component: DemoPageComponent },
	{ path: 'login', component: LoginPageComponent },
	{ path: 'demo', component: DemoPageComponent },
	{ path: 'demo/forms', component: MaterialFormDemoPageComponent },
	{ path: 'customer/list', component: CustomerListComponent },
	{ path: 'customer/create', component: CustomerCreateComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
	exports: [RouterModule],
})
export class AppRoutingModule {}
