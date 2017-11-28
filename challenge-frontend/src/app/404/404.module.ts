import { NgModule } from '@angular/core';
import { NotFoundPageComponent } from './404';
import { NotFoundRoutingModule } from "./404.routing.module";

@NgModule({
  declarations: [
    NotFoundPageComponent,
  ],
  imports: [
    NotFoundRoutingModule
  ],
  exports: [
    NotFoundPageComponent
  ]
})
export class NotFoundPageModule { }
