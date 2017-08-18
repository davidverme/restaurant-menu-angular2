import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Category } from '../../models';
import { DishesService } from '../../services/dishes.service';

@Component({
    selector: 'category-list',
    template: require('./category-list.component.html'),
    styles: [ require('./category-list.component.scss') ]
})
export class CategoryListComponent {
    categories: Array<Category> = [];

    constructor(private dishesService: DishesService, private router: Router) {
        this.dishesService.categories
            .subscribe((data) => this.categories = data);
    }

    displayCategory(id: string) {
        this.router.navigateByUrl(`/category/${id}`);
    }
}