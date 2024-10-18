import { Injectable } from '@angular/core';
import { Category } from '../_model/category';
import { Observable } from 'rxjs';
import { api_dwb_uri } from '../../../shared/api-dwb-uri';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private source="/category";

  constructor(private http: HttpClient) { }
  // getCategories(): Category[]{
  //   let categories: Category[] = [];


  //   let category:Category = new Category(0, "ejemplo0", "etiqueta0", 1);categories.push(category);
  //   category = new Category(1, "ejemplo1", "etiqueta1", 0); categories.push(category);
  //   category = new Category(2, "ejemplo2", "etiqueta2", 1); categories.push(category);
  //   category = new Category(3, "ejemplo3", "etiqueta3", 0); categories.push(category);

  //   return categories;
  // }
  getCategories(): Observable<any> { //invg cual es la diferencia entre el pico parentesis y el parentesis normal
    return this.http.get(api_dwb_uri+this.source);
  }
  getCategory(id:number): Observable<any>{
    return this.http.get(api_dwb_uri+this.source+"/"+id);
  }
  getActiveCategorias():Observable<any>{
    return this.http.get(api_dwb_uri+this.source+"/active");
  }

  createCategory(category:any):Observable<any>{
    return this.http.post<Category>(api_dwb_uri+this.source,category);
  }

  updateCategory(category:any, id:number):Observable<any>{
    return this.http.put<Category>(api_dwb_uri+this.source+"/"+id,category);
  }

  deleteCategory(id:number):Observable<any>{ //probar este aun no se si est bien
    return this.http.delete(api_dwb_uri+this.source+"/"+id);
  }



}