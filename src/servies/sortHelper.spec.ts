import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from '../app/app.component';
import { SortHelper } from './sortHelper.service';
let sortHelper;
fdescribe('SortHelper', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule
            ],
            declarations: [
                AppComponent
            ],
            providers: [SortHelper]
        }).compileComponents();
        sortHelper = new SortHelper();
    }));

    it('Sort simple strings', () => {
        let stringList = ["Sven", "Nina", "Miro", "Beata"];
        sortHelper.sort(stringList);
        let stringListResult = ["Beata", "Miro", "Nina", "Sven"];
        expect(stringList).toEqual(stringListResult);
    });

    it('Sort simple numbers', () => {
        let numberList = [6, 3, 2, 9, 1, 0, -5];
        sortHelper.sort(numberList);
        let numberListResult = [-5, 0, 1, 2, 3, 6, 9];
        expect(numberList).toEqual(numberListResult);
    });

    it('Sort simple Date', () => {
        let old = new Date(new Date().setHours(0))
        let middle = new Date(new Date().setHours(12))
        let newd = new Date(new Date().setHours(18))
        let dateList = [newd, old, middle];
        sortHelper.sort(dateList);
        let dateListResult = [old, middle, newd];
        expect(dateList).toEqual(dateListResult);
    });

    it('Sort object by strings', () => {
        let stringList = [{ firstName: "Sven" }, { firstName: "Nina" }, { firstName: "Miro" }, { firstName: "Beata" }];
        sortHelper.sort(stringList, ["firstName"]);
        let stringListResult = [{ firstName: "Beata" }, { firstName: "Miro" }, { firstName: "Nina" }, { firstName: "Sven" }];
        expect(stringList).toEqual(stringListResult);
    });

    it('Sort object with child object prop', () => {
        let stringList = [{ person: { firstName: "Sven" } }, { person: { firstName: "Nina" } }, { person: { firstName: "Miro" } }, { person: { firstName: "Beata" } }];
        sortHelper.sort(stringList, ["firstName"]);
        let stringListResult = [{ person: { firstName: "Beata" } }, { person: { firstName: "Miro" } }, { person: { firstName: "Nina" } }, { person: { firstName: "Sven" } }];
        expect(stringList).toEqual(stringListResult);
    });

    it('Sort multi prop', () => {
        let multiPropList = [{ person: { firstName: "Sven", lastName: "cde" } }, { person: { firstName: "Sven", lastName: "abc" } }];
        sortHelper.sort(multiPropList, ["person.firstName", "person.lastName"]);
        let multiPropListResult = [{ person: { firstName: "Sven", lastName: "abc" } }, { person: { firstName: "Sven", lastName: "cde" } }];
        expect(multiPropList).toEqual(multiPropListResult);
    });

    it('Sort object with propnumber', () => {
        let stringList = [{ value: 5 }, { value: 0 }, { value: -1 }];
        sortHelper.sort(stringList, ["firstName"]);
        let stringListResult = [{ value: -1 }, { value: 0 }, { value: 5 }];
        expect(stringList).toEqual(stringListResult);
    });
});
