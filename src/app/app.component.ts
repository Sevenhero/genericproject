import { Component } from '@angular/core';
import { DialogService } from 'src/generic/dialog.service';
import {
  ButtonClickedEvent,
  CustomTableConfig,
  Gender,
  GenderHelper,
} from 'src/generic/table.component';
import { SortHelper } from 'src/servies/sortHelper.service';
import { CustomFormConfig } from 'src/generic/form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private dialogService: DialogService,
    private sortHelper: SortHelper
  ) {}

  delete() {
    let personenName = 'Sven Kernke';
    this.dialogService
      .delete('Person löschen', `Wollen sie ${personenName} wirklich löschen?`)
      .subscribe((res) => {
        this.dialogService
          .confirm(
            'Person entgültig löschen?',
            'Dies kann nicht rückgängig gemacht werden'
          )
          .subscribe((res) => {
            console.log('confirm');
          });
      });
  }

  confirm() {
    // this.dialogService
    //   .confirm(
    //     'Person entgültig löschen?',
    //     'Dies kann nicht rückgängig gemacht werden'
    //   )
    //   .subscribe((res) => {
    //     console.log('confirm');
    //   });

    this.dialogService
      .confirm('Hallo Simon', 'bist du wirklich simon?')
      .subscribe((res) => {
        console.log('confirm');
      });
  }

  warning() {
    this.dialogService
      .warning(
        'Es ist ein Fehler aufgetreten',
        'Dies kann nur gemacht werden wenn die betroffene Person bereits gelöscht wurde.'
      )
      .subscribe((res) => {
        console.log('warning');
      });
  }

  error() {
    this.dialogService
      .error(
        'Person konnte nicht gelöscht werden',
        'Bitte entfernen Sie die Person zu erst aus allen Firmeneinträgen.'
      )
      .subscribe((res) => {
        console.log('error');
      });
  }

  dialogEmpty() {
    this.dialogService.create('Person', this.formconfig).subscribe((res) => {
      console.log('error');
    });
  }

  dialogWithObject() {
    this.dialogService
      .edit('Person', this.formconfig, this.items[0])
      .subscribe((res) => {
        console.log('error');
      });
  }

  // 'create' | 'update'
  items = [
    {
      id: 1,
      firstName: 'Sven',
      lastName: 'Kernke',
      count: 2,
      someDate: new Date(2019, 6, 1),
      zahl: 5,
      gender: Gender.man,
    },
    {
      id: 2,
      firstName: 'Max',
      lastName: 'Meier',
      count: 0,
      someDate: new Date(2020, 3, 2),
      zahl: 9,
      gender: Gender.man,
    },
    {
      id: 3,
      firstName: 'Jan',
      lastName: 'Holz',
      count: -1,
      someDate: new Date(2020, 1, 10),
      zahl: 1,
      gender: Gender.man,
    },
    {
      id: 4,
      firstName: 'Alexander',
      lastName: 'König',
      count: 5,
      someDate: new Date(2020, 1, 15),
      zahl: 1,
      gender: Gender.divers,
    },
    {
      id: 5,
      firstName: 'Joel',
      lastName: 'Stein',
      count: 5,
      someDate: new Date(2020, 1, 15),
      zahl: 1,
      gender: Gender.woman,
    },
    {
      id: 6,
      firstName: 'Mirsolaw',
      lastName: 'Gras',
      count: 5,
      someDate: new Date(2020, 1, 15),
      zahl: 1,
      gender: Gender.man,
    },
    {
      id: 7,
      firstName: 'Nôel',
      lastName: 'Vier',
      count: 8,
      someDate: new Date(2020, 1, 15),
      zahl: 1,
      gender: Gender.man,
    },
  ];
  config: CustomTableConfig = {
    items: [
      { propname: 'firstName', label: 'Vorname' },
      { propname: 'lastName', label: 'Nachname' },
      { propname: 'someDate', label: 'Datum', ctype: 'date' },
      { propname: 'count', label: 'Count', ctype: 'number' },
      { propname: 'zahl', label: 'Zahl', ctype: 'number' },
      {
        propname: 'gender',
        label: 'Geschlecht',
        ctype: 'enum',
        enumHelper: new GenderHelper(),
      },
      { label: 'Edit', ctype: 'button', functionName: 'editTest' },
    ],
  };

  formconfig: CustomFormConfig = {
    items: [
      { propname: 'firstName', label: 'Vorname' },
      { propname: 'lastName', label: 'Nachname' },
      { propname: 'someDate', label: 'Datum', ctype: 'date' },
      { propname: 'count', label: 'Count', ctype: 'number' },
      { propname: 'zahl', label: 'Zahl', ctype: 'number' },
      {
        propname: 'gender',
        label: 'Geschlecht',
        ctype: 'enum',
        enumHelper: new GenderHelper(),
      },
    ],
  };

  test(event: ButtonClickedEvent) {
    switch (event.functionName) {
      case 'editTest':
        this.editTest(event.id);
        break;
      default:
        break;
    }
  }

  editTest(id) {
    console.log(id);
    let person = this.items.find((p) => p.id === id);
    this.dialogService
      .edit('Person', this.formconfig, person)
      .subscribe((res) => {
        console.log('error');
      });
    // alert('you wanted to change item with id:' + id);
  }
}
