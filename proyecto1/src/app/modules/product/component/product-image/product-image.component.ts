//import { Component } from '@angular/core';
import { Component } from '@angular/core';
import { SharedModule } from '../../../../shared/shared-module';
import { ProductService } from '../../_service/product.service';
import { ProductImageService } from '../../_service/product-image.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../_service/category.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { SwalMessages } from '../../../../shared/swal-messages';
import { Product } from '../../_model/product';
//import { CategoryComponent } from '../category/category.component';
import { SweetAlertArrayOptions } from 'sweetalert2';
import { Category } from '../../_model/category';

//Declarar variable global de jquery
declare var $: any;


//import { SharedModule } from '../../../../shared/shared-module';

@Component({
  selector: 'app-product-image',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './product-image.component.html',
  styleUrl: './product-image.component.css'
})


export class ProductImageComponent {
  form : FormGroup;
  submitted=false;
  productImgs=[];
  //checar si esto ta bien, creo que es mejor crear un objeto del topo Category
  

constructor(
  private productService: ProductService,
  private productServiceImage: ProductImageService,
  private formBuilder: FormBuilder,
  private categoryService:CategoryService,
  private route: ActivatedRoute,
  private router: Router

){
  this.form = this.formBuilder.group({
    product: ["",[Validators.required]],
    gtin: ["", [Validators.required, Validators.pattern('^[0-9]{13}$')]],
    description: ["",[Validators.required]],
    price: ["", [Validators.required, Validators.pattern('^[0-9]*$')]],
    stock: ["", [Validators.required, Validators.pattern('^[0-9]*$')]],
    category: ["",[Validators.required]],
    category_id: ["",[Validators.required]]

  })

}

  gtin: any
  product: Product =new Product();
  swal: SwalMessages =  new SwalMessages();
  //categories: any; //revisar si esto esta bien
  categories: Category[] = []; 

  ngOnInit(){
    this.gtin=this.route.snapshot.paramMap.get('gtin');
    if(this.gtin){
      this.getProduct()
    }
  }


  //getProductImages(id:number){}

  getProduct(){
    this.productService.getProduct(this.gtin).subscribe({
      next: (v) =>{
        this.product=v;
        //this.getProductImages(this.product.product_id);
      },
      error: (e) =>{
        this.swal.errorMessage(e.error.message)
      }

    });
  }

  getCategories(){
    this.categoryService.getCategories().subscribe({
      next:(v)=>{
        this.categories=v;
        console.log(this.categories);
      },
      error:(e) =>{
        this.swal.errorMessage(e.error.message)
      }
    })
  }

  //redirect
  redirect(url:string[]){
    this.router.navigate(url);
  }
  //show and hide modal
  
  showModalForm(){
    this.submitted = false;
    this.form.reset();
    $("#modalForm").modal("show");
  }
  hideModalForm(){
    $("#modalForm").modal("hide");
  }


  //update product
  updateProduct(){
    this.form.reset();
    this.submitted=false;
    //$("#modalForm").modal('show');
    this.getCategories();

    this.form.controls['product'].setValue(this.product.product);
    this.form.controls['gtin'].setValue(this.product.gtin);
    this.form.controls['description'].setValue(this.product.description);
    this.form.controls['price'].setValue(String(this.product.price));
    this.form.controls['stock'].setValue(String(this.product.stock));
    this.form.controls['category'].setValue(String(this.product.category));
    this.form.controls['category_id'].setValue(String(this.product.category_id))

     $("#modalForm").modal('show');

  }

  //metodo Onsubmit
  onSubmit(){
    this.submitted = true;
    if(this.form.invalid){ return;}
    this.onSubmitUpdate();
    this.submitted=false;
  }

  //onSubmitUpdate
  onSubmitUpdate(){
    this.productService.updateProduct(this.form.value,this.product.product_id).subscribe({
      next:(v) => {
        this.getProduct();
        this.hideModalForm();
        this.swal.successMessage(v.message);
      },
      error: (e) =>{
        console.log("hola si entro aqui")
        console.log(e);
        this.swal.errorMessage(e.error.message);
      }
    });

  }

  
}
