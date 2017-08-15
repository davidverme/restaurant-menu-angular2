import { Injectable } from '@angular/core';
import {
    Http,
    Response
} from '@angular/http';

import 'rxjs/add/operator/map';

import { Category } from '../models';

@Injectable()
export class RestService {
    constructor(private http: Http) {}

    getCategories() {
        return this.http.get('api/categories')
                .map((response) => {
                    const json = response.json();

                    if (response.ok) {
                        return json.data as Category[];
                    } else {
                        return this.logError(json);
                    }
                });
    }

    private logError(error: any) {
        console.error(error.error);
        throw error;
    }
}