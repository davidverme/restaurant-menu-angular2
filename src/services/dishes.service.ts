import { Injectable } from '@angular/core';
import { Category } from '../models';
import { Dish } from '../models';

import { BehaviorSubject } from 'rxjs/Rx';

@Injectable()
export class DishesService {
    categories = new BehaviorSubject<Array<Category>>([]);

    setData(data: Array<Category>) {
        this.categories.next(data);
    }

    getCategories(): Array<Category> {
        return this.categories.value;
    }

    getDishesByCategory(categoryId: string): Array<Dish> {
        let result = this.categories.value.find((item) => item.id === categoryId);

        if (!result) {
            return null;
        }

        return result.dishes;
    }
}