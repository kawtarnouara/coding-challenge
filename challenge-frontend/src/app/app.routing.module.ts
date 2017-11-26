import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopsComponent } from './shops/shops.component';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { LoginComponent } from './user/login/login.component';
export const appRoutes: Routes = [
    { path: '',  redirectTo: '/home', pathMatch: 'full' },
    { path: 'home',       component: HomeComponent },
    { path: 'shops', component: ShopsComponent },
    { path: 'login', component: LoginComponent },
    { path: 'sign-up', component: SignUpComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {
}
