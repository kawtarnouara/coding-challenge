import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopsComponent } from './shops/shops.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { LoginComponent } from './user/login/login.component';
import { AuthGuardLoginService } from "./user/services/auth-guard-login.service";
import { ErrorPageComponent } from "./500/500";
export const appRoutes: Routes = [
    { path: '',  redirectTo: '/shops', pathMatch: 'full' },
    { path: 'shops', component: ShopsComponent },
    { path: 'login', canActivate: [AuthGuardLoginService], component: LoginComponent },
    { path: 'sign-up',canActivate: [AuthGuardLoginService], component: SignUpComponent },
    { path: '500', component: ErrorPageComponent },
    {path : '**', redirectTo: '/404'}    
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
