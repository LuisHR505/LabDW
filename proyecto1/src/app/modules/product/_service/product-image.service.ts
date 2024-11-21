import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { api_dwb_uri } from '../../../shared/api-dwb-uri';
import { ProductImage} from '../_model/product_image';

@Injectable({
  providedIn: 'root'
})
export class ProductImageService {

  private source = "/product-image";
  constructor(private http: HttpClient) { }

  uploadProductImage(product_image:any):Observable <any>{
    return this.http.post<any>(api_dwb_uri+this.source,product_image)
  }

  //falta implementar
  getProductImage(product_id:number):Observable <any>{
    return this.http.get<ProductImage>(api_dwb_uri+this.source+"/"+product_id)
  }
  //falta implementar el delete
  deleteProductImage(product_image_id:number):Observable<any>{
    return this.http.delete<any>(api_dwb_uri+this.source+"/"+product_image_id)
  }


}
