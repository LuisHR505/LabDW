import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { api_dwb_uri } from '../../../shared/api-dwb-uri';
import { Observable } from 'rxjs';
import { ProductImageService } from './product-image.service';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class CaterogriaEspecificaService {
  private source = "/product/category/";

  constructor(private http: HttpClient) { }

  //servicio para obtener los productos dada una categoria en especifico.
  getCategoryProducts(id:number): Observable<any>{
    return this.http.get(api_dwb_uri + this.source + id);
  }
}
