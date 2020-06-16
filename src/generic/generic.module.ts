import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { AppRoutingModule } from '../app/app-routing.module';
import { FormComponent } from './form.component';
import { DialogComponent } from './dialog.component';
import { DialogService, MessageBoxService } from './dialog.service';
import { CustomTableComponent } from './table.component';

let COMPONENTS = [FormComponent, DialogComponent, CustomTableComponent];

@NgModule({
  declarations: [COMPONENTS],
  imports: [BrowserModule, AppRoutingModule],
  providers: [DialogService, MessageBoxService],
  exports: [COMPONENTS],
  bootstrap: [],
  entryComponents: [],
})
export class GenericModule {}
