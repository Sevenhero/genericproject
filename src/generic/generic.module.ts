import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { AppRoutingModule } from '../app/app-routing.module';
import { FormComponent } from './form.component';
import { DialogComponent } from './dialog.component';
import { DialogService } from './dialog.service';
import { CustomTableComponent } from './table.component';
import { CopyObjectService } from 'src/servies/CopyObject.service';
import { FormsModule } from '@angular/forms';

let COMPONENTS = [FormComponent, DialogComponent, CustomTableComponent];

@NgModule({
  declarations: [COMPONENTS],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [DialogService, CopyObjectService],
  exports: [COMPONENTS],
  bootstrap: [],
  entryComponents: [],
})
export class GenericModule {}
