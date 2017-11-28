import { NgModule } from '@angular/core';
import { ErrorPageComponent } from './500';
import { ErrorRoutingModule } from "./500.routing.module";

@NgModule({
  declarations: [
    ErrorPageComponent,
  ],
  imports: [
    ErrorRoutingModule
  ],
  exports: [
    ErrorPageComponent
  ]
})
export class ErroPageModule { }
