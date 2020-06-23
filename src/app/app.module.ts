import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GenericModule } from './../generic/generic.module';
import { SortHelper } from '../servies/sortHelper.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, GenericModule],
  providers: [SortHelper],
  entryComponents: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
