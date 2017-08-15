import { Component } from '@angular/core';

import { DishesService } from '../../services/dishes.service';
import { RestService } from '../../services/rest.service';
import { Category } from '../../models';

@Component({
    selector: 'dynamic-form-app',
    template: require('./app.component.html')
})
export class AppComponent {

    constructor(private dishesService: DishesService, private restService: RestService) {
        restService.getCategories().subscribe((data: Category[]) => {
            this.dishesService.setData(data);
        });
    }
}