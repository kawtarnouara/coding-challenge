import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListShopComponent } from './list-shops-component/list.component';
import { ShopsComponent } from './shops.component';
import { LikedShopComponent } from './liked-shops-component/liked.component';
import { AuthGuardService as AuthGuard } from '../user/services/auth-guard.service';

const shopsRoutes: Routes = [
    {
        path: 'shops',
        component: ShopsComponent,
        children: [
            // used AuthGuard to check if the user is logged in
            { path: '', component: ListShopComponent, canActivate: [AuthGuard], },
            { path: 'liked', component: LikedShopComponent, canActivate: [AuthGuard], },
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(shopsRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class ShopsRoutingModule { }
