import { NgModule } from '@angular/core';
import {
    RouterModule,
    Routes
} from '@angular/router';

import { CategoryListComponent } from './components/category-list/category-list.component';
import { DishesListComponent } from './components/dishes-list/dishes-list.component';

const appRoutes: Routes = [
    {
        path: 'categories',
        component: CategoryListComponent
    },
    {
        path: 'category/:name',
        component: DishesListComponent
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/categories'
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, { useHash: true })
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}