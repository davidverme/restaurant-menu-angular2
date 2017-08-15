import { Dish } from './dish.model';

export interface Category {
	id: string;
    name: string;
    dishes: Array<Dish>;
}