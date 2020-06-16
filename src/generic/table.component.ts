import {
  Component,
  Input,
  AfterViewInit,
  Output,
  EventEmitter,
  OnInit,
} from '@angular/core';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Component({
  selector: 'custom-table',
  templateUrl: 'table.component.html',
  styles: [
    `
      .parent {
        display: flex;
      }
      .parent div {
        flex: 1;
      }
    `,
  ],
})
export class CustomTableComponent implements OnInit {
  direction = Direction;
  itemsCopy: any[] = [];
  @Input() items: any[] = [];
  @Input() config: CustomTableConfig;
  @Output() buttonClicked: EventEmitter<{
    functionName: string;
    id: any;
  }> = new EventEmitter<{ functionName: string; id: any }>();

  enumSelections = {};
  ngOnInit() {
    for (let item of this.config.items) {
      if (item.ctype === 'enum') {
        this.enumSelections[item.propname] = null;
      }
    }
  }

  search(event: any, propName: string) {
    let input = event.srcElement.value;
    let option = this.getOptionByPropName(propName);

    if (this.itemsCopy.length == 0) {
      this.itemsCopy = [...this.items];
    }
    if (!input && input.length === 0) {
      this.items = [...this.itemsCopy];
    } else {
      switch (option.ctype) {
        case 'string':
          this.filterByPropValueString(propName, input);
          break;
        case 'number':
        case 'enum':
          if (option.ctype === 'enum') {
            this.enumSelections[option.propname] = input;
          }
          this.filterByPropValueNumber(propName, +input);
          break;
        case 'date':
          let dateString: string = input;
          let year = +dateString.substr(0, 4);
          let month = +dateString.substr(5, 2);
          let day = +dateString.substr(8, 2);
          let date = new Date(year, month - 1, day);
          this.filterByPropValueDate(propName, date.getTime());
          break;
        default:
          throw `${option.ctype} not implemented`;
      }
    }
  }

  private filterByPropValueString(propName: string, value: string) {
    this.items = this.itemsCopy.filter((item) => {
      return (
        item[propName] &&
        item[propName].toLocaleLowerCase().includes(value.toLocaleLowerCase())
      );
    });
  }

  private filterByPropValueNumber(propName: string, value: number) {
    this.items = this.itemsCopy.filter((item) => {
      return item[propName] == value;
    });
  }

  private filterByPropValueDate(propName: string, value: number) {
    this.items = this.itemsCopy.filter((item) => {
      return item[propName] && item[propName].getTime() == value;
    });
  }

  bclicked(id: any, functionName: string) {
    this.buttonClicked.emit({ id, functionName });
  }

  sort(propName: string) {
    let option = this.getOptionByPropName(propName);
    option.direction =
      option.direction == Direction.ASC ? Direction.DESC : Direction.ASC;
    this.items.sort((a, b) => {
      if (option.direction == Direction.ASC) {
        return a[propName] < b[propName] ? -1 : 1;
      } else {
        return a[propName] > b[propName] ? -1 : 1;
      }
    });
  }

  private getOptionByPropName(propName: string) {
    return this.config.items.find((item) => item.propname === propName);
  }
}
type CType = 'number' | 'string' | 'date' | 'button' | 'enum';
export class SelectItem {
  key: any;
  value: any;
}
export interface EnumHelper {
  getText(e: any): string;
  getSelectItems(): SelectItem[];
}

export class CustomTableItem {
  propname?: string;
  label: string;
  ctype: CType;
  minwidth?: string;
  direction?: Direction;
  functionName?: string;
  enumHelper?: EnumHelper;
}

export class CustomTableConfig {
  items: CustomTableItem[] = [];
}

export enum Direction {
  ASC,
  DESC,
}

export interface ButtonClickedEvent {
  id: any;
  functionName: string;
}

export enum Gender {
  man,
  woman,
  divers,
}

export class GenderHelper implements EnumHelper {
  getText(gender: Gender) {
    switch (gender) {
      case Gender.man:
        return 'Mann';
      case Gender.woman:
        return 'Frau';
      case Gender.divers:
        return 'anders';
    }
  }
  getSelectItems() {
    let result: SelectItem[] = [];
    let enumLength = Object.keys(Gender).length / 2;
    for (let i = 0; i < enumLength; i++) {
      result.push({ key: this.getText(i), value: i });
    }
    return result;
  }
}
