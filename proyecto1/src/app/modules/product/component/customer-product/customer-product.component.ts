import { Component } from '@angular/core';
import { SharedModule } from '../../../../shared/shared-module';

import { SwalMessages } from '../../../../shared/swal-messages';
import { Product } from '../../_model/product';
import { ProductService } from '../../_service/product.service';
import { ProductImageService } from '../../_service/product-image.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-customer-product',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './customer-product.component.html',
  styleUrl: './customer-product.component.css'
})
export class CustomerProductComponent {

  productImgs: any[] = [];
  quantity:number=1;

  constructor(
    private productService: ProductService,
    private productImageService: ProductImageService,
    private route: ActivatedRoute,
    private router: Router
  ){}

  gtin: any
  product: Product =new Product();
  swal: SwalMessages =  new SwalMessages();

  ngOnInit(){
    this.gtin=this.route.snapshot.paramMap.get('gtin');
    if(this.gtin){
      this.getProduct()
    } 
  }

  getProduct(){
    this.productService.getProduct(this.gtin).subscribe({
      next: (v) =>{
        this.product=v;
        this.getProductImages(this.product.product_id);
      },
      error: (e) =>{
        this.swal.errorMessage(e.error.message)
      }

    });
  }

  getProductImages(id: number){
    this.productImageService.getProductImage(id).subscribe({
      next: (v) => {
        this.productImgs = v;
        console.log(v);
      },

      error: (e) => {
        console.error(e);
      }
    });
  }

    //redirect
    redirect(id_categoria:number){
      this.router.navigate(['product/category/'+id_categoria]);
    }

    increaseQuantity() {
      this.quantity++;
    }
  
    decreaseQuantity() {
      if (this.quantity > 1 && this.quantity!=1) {
        this.quantity--;
      }
    }

}
