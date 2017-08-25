import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Dish } from '../../models';
import { DishesService } from '../../services/dishes.service';

@Component({
    selector: 'dishes-list',
    template: require('./dish-details.component.html'),
    styles: [ require('./dish-details.component.scss') ]
})
export class DishDetailsComponent {
    dish: Dish = null;

    rating = 2;
    
    submitted = false;

    constructor(private dishesService: DishesService, private route: ActivatedRoute) { 
        this.dish = {
                id: null,
                name: null,
                streamId: null,
                price: null,
                ranking: null,
                calories: null,
                picture: null
            };
    }

    ngOnInit() {
        this.dishesService.categories.subscribe(() => {
            const id = this.route.params.map(p => p['id'])
            id.subscribe((value:string) => {
                const result = this.dishesService.getDishById(parseInt(value));
                if (result) {
                    this.dish = result;
                } 
            })
        });
    }

    onSubmit() { 
        this.submitted = true; 
    }
}