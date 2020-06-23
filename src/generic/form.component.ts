import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { EnumHelper, CType } from './table.component';
import { CopyObjectService } from 'src/servies/CopyObject.service';

@Component({
  selector: 'generic-from',
  templateUrl: 'form.component.html',
  styles: [
    `
      .backdrop {
        width: 100vw;
        height: 100vh;
      }
    `,
  ],
})
export class FormComponent implements OnInit, OnChanges {
  constructor() {
    this.currentYear = new Date().getFullYear();
  }
  currentYear: number;
  @Input() config: CustomFormConfig;
  @Input() model: {};
  modelCopy;
  enumSelections = {};

  ngOnChanges() {
    this.copyModel();
  }

  ngOnInit() {
    this.setDefaultCType();
    this.copyModel();
  }

  private setDefaultCType() {
    for (let item of this.config.items) {
      if (!item.ctype) item.ctype = 'string';
    }
  }

  private copyModel() {
    this.modelCopy = this.model
      ? CopyObjectService.clone(this.model)
      : this.createEmptyObject();
    console.info(this.modelCopy);
  }

  private createEmptyObject() {
    let result = {};
    for (let item of this.config.items) {
      result[item.propname] = null;
    }
    return result;
  }
}

export class CustomFormConfig {
  items: FormConf[] = [];
}

export class FormConf {
  propname: string;
  label: string;
  ctype?: CType = 'string';
  format?: string;
  placeholder?: string;
  minlength?: number;
  maxlength?: number;
  required?: boolean = true;
  enumHelper?: EnumHelper;
}
