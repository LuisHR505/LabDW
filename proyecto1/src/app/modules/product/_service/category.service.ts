import { Injectable } from '@angular/core';
import { Category } from '../_model/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor() { }
  getCategories(): Category[]{
    let categories: Category[] = [];


    let category:Category = new Category(0, "ejemplo0", "etiqueta0", 1);categories.push(category);
    category = new Category(1, "ejemplo1", "etiqueta1", 0); categories.push(category);
    category = new Category(2, "ejemplo2", "etiqueta2", 1); categories.push(category);
    category = new Category(3, "ejemplo3", "etiqueta3", 0); categories.push(category);

    return categories;
  }

}
