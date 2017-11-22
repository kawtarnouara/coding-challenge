import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListShopComponent } from './list-shops-component/list.component';
import { ShopsComponent } from './shops.component';

const shopsRoutes: Routes = [
{
    path: 'shops',
    component: ShopsComponent,
    children: [
        { path: '', component: ListShopComponent },
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
