import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Dish } from '../../models';
import { DishesService } from '../../services/dishes.service';

@Component({
    selector: 'dishes-list',
    template: require('./dishes-list.component.html'),
    styles: [ require('./dishes-list.component.scss') ]
})
export class DishesListComponent {
    dishes: Array<Dish> = [];

    constructor(private dishesService: DishesService, private route: ActivatedRoute) { }

    ngOnInit() {
        this.dishesService.categories.subscribe(() => {
            const name = this.route.params.map(p => p['name'])
            name.subscribe((value:string) => {
                        this.dishes = this.dishesService.getDishesByCategory(value);
            })
        });
    }
}