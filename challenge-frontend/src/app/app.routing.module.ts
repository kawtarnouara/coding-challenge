import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopsComponent } from './shops/shops.component';
import { HomeComponent } from './home/home.component';
export const appRoutes: Routes = [
    { path: '',  redirectTo: '/home', pathMatch: 'full' },
    { path: 'home',       component: HomeComponent },
    { path: 'shops', component: ShopsComponent }
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
