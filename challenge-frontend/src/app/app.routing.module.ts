import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopsComponent } from "./shops/shops.component";
export const appRoutes: Routes = [
    { path: '',  redirectTo: '/shops', pathMatch: 'full' },
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
