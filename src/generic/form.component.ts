import { Component } from '@angular/core';

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
export class FormComponent {
  constructor() {
    this.currentYear = new Date().getFullYear();
  }
  currentYear: number;
}

type FormType = 'number' | 'string' | 'Date' | 'select';

export class FormConf {
  label: string;
  ctype?: FormType = 'string';
  format?: string;
  placeholder?:string;
  minlength?: number;
  maxlength?: number;
  required?: boolean = true;
}
