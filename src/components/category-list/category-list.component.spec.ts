import {
    async,
    inject,
    TestBed
} from '@angular/core/testing';
import { Router } from '@angular/router';

import { CategoryListComponent } from './category-list.component';
import { DishesService } from '../../services/dishes.service';

class MockRouter {
    navigateByUrl(url: string) { return url; }
}

class MockDishesService {
    categories = {
        subscribe: () => {}
    }
}

describe('Component: CategoryListComponent', () => {
    let component: CategoryListComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CategoryListComponent],
            providers: [
                { provide: Router, useClass: MockRouter },
                { provide: DishesService, useClass: MockDishesService }
            ]
        })
        .compileComponents().then(() => {
            const fixture = TestBed.createComponent(CategoryListComponent);

            component = fixture.componentInstance;
        });
    }));

    it('should have a defined component', () => {
        expect(component).toBeDefined();
    });

    describe('#displayCategory', () => {
        it('should call Router.navigateByUrl("category/:name") with the NAME of the category', inject([Router], (router: Router) => {
            const spy = spyOn(router, 'navigateByUrl');

            component.displayCategory('drinks');

            const url = spy.calls.first().args[0];

            expect(url).toBe('/category/drinks');
        }));
    });
});