import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GenericModule } from './../generic/generic.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, GenericModule],
  providers: [],
  entryComponents: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
