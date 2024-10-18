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
  
  //Metodos GET
  getCategories(): Observable<any> { 
    return this.http.get(api_dwb_uri+this.source);
  }
  getCategory(id:number): Observable<any>{
    return this.http.get(api_dwb_uri+this.source+"/"+id);
  }
  getActiveCategorias():Observable<any>{
    return this.http.get(api_dwb_uri+this.source+"/active");
  }

  //metodosPost

  createCategory(category:any):Observable<any>{
    return this.http.post(api_dwb_uri+this.source, category);
  }//aqui habia un <Category> 

  //metodos update
  updateCategory(category:any, id:number):Observable<any>{
    return this.http.put<Category>(api_dwb_uri+this.source+"/"+id,category);
  }
  updateActiveCategory(category:any,id:number):Observable<any>{
    return this.http.put<Category>(api_dwb_uri+this.source+"/"+id,category+"/activate")
  }

  //metodos Delete
  deleteCategory(id:number):Observable<any>{ //probar este aun no se si est bien
    return this.http.delete(api_dwb_uri+this.source+"/"+id);
  }



}