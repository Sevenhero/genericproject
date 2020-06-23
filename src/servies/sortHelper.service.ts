import { isPlatformServer } from '@angular/common';

export class SortHelper {
    sort(items: any[], props?: string[], direction = true) {
        return items.sort((item1, item2) => {
            let i = 0;
            let value1;
            let value2;
            do {
                value1 = !props ? item1 : this.getValueByProp(item1, props[i]);
                value2 = !props ? item2 : this.getValueByProp(item2, props[i]);
                if (!value1 && value1 !== 0) return -1;
                if (!value2 && value2 !== 0) return 1;
                i++;
                if (value1 !== value2 || i === props.length) {
                    break;
                }
            } while (props)
            if (value1 === value2) return 0;
            if (typeof value1 === "string") {
                value1 = value1.toLocaleLowerCase();
                value2 = value2.toLocaleLowerCase();
            }
            if (direction) return value1 < value2 ? -1 : 1
            else return value1 < value2 ? 1 : -1
        });
    }

    private getValueByProp(obj: object, props: string) {
        let currentValue = obj;
        let splitedProps = props.split(".");
        for (let prop of splitedProps) {
            if (currentValue && (currentValue[prop] || currentValue[prop] === 0)) {
                currentValue = currentValue[prop]
            } else {
                currentValue = null;
                break;
            }
        }
        return currentValue;
    }
}