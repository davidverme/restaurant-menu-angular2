import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppRoutingModule } from './app-routing.module';

import { DishesService } from './services/dishes.service';
import { FauxDishesService } from './services/in-memory.service';
import { RestService } from './services/rest.service';

import {
    AppComponent,
    CategoryListComponent
} from './components';

@NgModule({
    bootstrap: [ AppComponent ],
    declarations: [
        AppComponent,
        CategoryListComponent,
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        HttpModule,
        InMemoryWebApiModule.forRoot(FauxDishesService),
        ReactiveFormsModule
    ],
    providers: [
        DishesService,
        RestService
    ]
})
export class AppModule {}