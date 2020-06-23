import { Component } from '@angular/core';
import { DialogService, MessageBoxService } from 'src/generic/dialog.service';
import { ButtonClickedEvent, CustomTableConfig, Direction, Gender, GenderHelper } from 'src/generic/table.component';
import { SortHelper } from 'src/servies/sortHelper.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private dialogService: DialogService,
    private messageBoxService: MessageBoxService,
    private sortHelper: SortHelper
  ) {

  }

  delete() {
    this.messageBoxService
      .delete('Person löschen', 'Wollen sie Hans Meier wirklich löschen?')
      .subscribe((res) => {
        this.messageBoxService
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
    this.messageBoxService
      .confirm(
        'Person entgültig löschen?',
        'Dies kann nicht rückgängig gemacht werden'
      )
      .subscribe((res) => {
        console.log('confirm');
      });
  }

  warning() {
    this.messageBoxService
      .warning(
        'Es ist ein Fehler aufgetreten',
        'Dies kann nur gemacht werden wenn die betroffene Person bereits gelöscht wurde.'
      )
      .subscribe((res) => {
        console.log('warning');
      });
  }

  error() {
    this.messageBoxService
      .error(
        'Person konnte nicht gelöscht werden',
        'Bitte entfernen Sie die Person zu erst aus allen Firmeneinträgen.'
      )
      .subscribe((res) => {
        console.log('error');
      });
  }

  // 'create' | 'update'
  items = [
    { id: 1, firstName: "Sven", lastName: "Kernke", "count": 2, someDate: new Date(2019, 1, 15), zahl: 5, gender: Gender.man },
    { id: 2, firstName: "Alexey", lastName: "Balakin", "count": 0, someDate: new Date(2020, 3, 2), zahl: 9, gender: Gender.man },
    { id: 3, firstName: "Sebastian", lastName: "Dittmann", "count": -1, someDate: new Date(2020, 1, 10), zahl: 1, gender: Gender.man },
    { id: 4, firstName: "Alexander", lastName: "Ott", "count": 5, someDate: new Date(2020, 1, 15), zahl: 1, gender: Gender.divers },
    { id: 5, firstName: "Joel", lastName: "Krönig", "count": 5, someDate: new Date(2020, 1, 15), zahl: 1, gender: Gender.woman },
    { id: 6, firstName: "Mirsolaw", lastName: "Kernke", "count": 5, someDate: new Date(2020, 1, 15), zahl: 1, gender: Gender.man }
  ];
  config: CustomTableConfig = {
    items: [
      { propname: "firstName", label: "Vorname", ctype: "string" },
      { propname: "lastName", label: "Nachname", ctype: "string" },
      { propname: "someDate", label: "Datum", ctype: "date" },
      { propname: "count", label: "Count", ctype: "number" },
      { propname: "zahl", label: "Zahl", ctype: "number" },
      { propname: "gender", label: "Geschlecht", ctype: "enum", enumHelper: new GenderHelper() },
      { label: "Edit", ctype: "button", functionName: "editTest" },
    ]
  };

  test(event: ButtonClickedEvent) {
    switch (event.functionName) {
      case "editTest":
        this.editTest(event.id);
        break;
      default:
        break;
    }
  }

  editTest(id) {
    console.log(id);
    alert("you wanted to change item with id:" + id);
  }
}
