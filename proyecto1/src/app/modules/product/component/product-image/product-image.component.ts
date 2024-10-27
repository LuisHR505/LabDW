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
import { ProductImage } from '../../_model/product_image';
import { NgxPhotoEditorService } from 'ngx-photo-editor';

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
  productImgs: any[] = [];
  //checar si esto ta bien, creo que es mejor crear un objeto del topo Category
  

constructor(
  private productService: ProductService,
  private productImageService: ProductImageService,
  private formBuilder: FormBuilder,
  private categoryService:CategoryService,
  private route: ActivatedRoute,
  private router: Router,
  private ngxService: NgxPhotoEditorService

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
        this.getProductImages(this.product.product_id);
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
    this.form.controls['category_id'].setValue(this.product.category_id)
    //esto es nuevo
    //esto no es nuevo
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
    console.log("Esto regresa el formulario: ", this.form.value, "Esta es la id del producto: ",this.product.product_id)
    this.productService.updateProduct(this.form.value,this.product.product_id).subscribe({
      next:(v) => {
        this.getProduct();
        this.hideModalForm();
        this.swal.successMessage(v.message);
      },
      error: (e) =>{
        console.log("hola si entro aqui es que hubo un error")
        console.log(e);
        this.swal.errorMessage(e.error.message);
      }
    });

  }

  //para las imagenes
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
  
  deleteProductImage(product_image_id: number){
    this.productImageService.deleteProductImage(product_image_id).subscribe({
      next: (v) => {
        this.getProductImages(this.product.product_id);
        this.swal.successMessage(v.message);
      },
      error: (e) => {
        console.error(e);
        this.swal.errorMessage(e.error.message);
      }
    });
  }

    uploadProductImage(image: string){
      let productImage: ProductImage = new ProductImage();
      productImage.product_id = this.product.product_id;
      productImage.image = image;
      this.productImageService.uploadProductImage(productImage).subscribe({
        next: (v) => {
          this.getProductImages(this.product.product_id);
          this.swal.successMessage(v.message);
        },
        error: (e) => {
          console.error(e);
          this.swal.errorMessage(e.error.message);
        }
      });
    }


    fileChangeHandler($event: any) {
      this.ngxService.open($event, {
        aspectRatio: 1 / 1,
        autoCropArea: 1,
        resizeToWidth: 360,
        resizeToHeight: 360,
      }).subscribe(data => {
        this.uploadProductImage(data.base64!);
      });
    }
  
  

  
}
