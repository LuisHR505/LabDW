import { Component } from '@angular/core';
import { CategoryService } from '../../_service/category.service';
import { Category } from '../../_model/category';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { SharedModule } from '../../../../shared/shared-module';
import { SwalMessages } from '../../../../shared/swal-messages';
import Swal from 'sweetalert2';
//Declarar variable global de jquery
declare var $: any;

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {

  categories: Category[] = []; //aqui falta un cambio revisa si esta bien 
   
  categoryUpdate= 0; //checar este error
  category_id=0;
   
  form: FormGroup;
  current_date = new Date(); // hora y fecha actual
  loading=false;
  submitted = false;
  swal: SwalMessages = new SwalMessages(); 
  
  //primero servicio, luego componrente luego vistas
  constructor(private categoryService: CategoryService, private formBuilder: FormBuilder) {    
    this.form = this.formBuilder.group({
      category: ["", [Validators.required]],
      tag: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getCategories();
  }

  //enable y disable
  
  disableCategory(id: number){
    this.swal.confirmMessage.fire({
      title: "Favor de confirmar la eliminación",
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoryService.disableCategory(id).subscribe({
          next: (v) => {
            this.swal.successMessage(v.message);
            this.getCategories();
          },
          error: (e) => {
            console.log(e);
            this.swal.errorMessage(e.error.message);
          }
        });
      }
    });
  }

  
  enableCategory(id: number){
    this.swal.confirmMessage.fire({
      title: "Favor de confirmar la activación",
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoryService.enableCategory(id).subscribe({
          next: (v) => {
            this.swal.successMessage(v.message);
            this.getCategories();
          },
          error: (e) => {
            console.log(e);
            this.swal.errorMessage(e.error.message);
          }
        });
      }
    });
  }




  showModalForm(){
    this.submitted = false;
    this.form.reset();
    $("#modalForm").modal("show");
  }
  hideModalForm(){
    $("#modalForm").modal("hide");
  }

  
  getCategories(): void {
    this.loading = true;
    this.categoryService.getCategories().subscribe({
      next: (v) => {
        console.log(v);
        this.categories= v;
        this.loading = false;
        console.log(this.categories)
      },
      error: (e) => {
        this.loading = false;
        this.swal.errorMessage("No hay un listado de categorias")
        
      }
    });

  }
  onSubmit(){
    this.submitted = true;
    if(this.form.invalid){ return;}
    this.submitted = false;

    // valida si se está registrando o actualizando una categoria
    if(this.category_id== 0){
      this.onSubmitCreate();
    }else{
      this.onSubmitUpdate();
    }

  }

  onSubmitCreate(){
    console.log(this.form.value);
    this.categoryService.createCategory(this.form.value).subscribe({
      next: (v) =>{
        this.getCategories();
        this.hideModalForm();
        this.resetVariables();
        this.swal.successMessage("Se ha creado la categoria");

      },
      error: (e) =>{
        console.log(e);
        this.swal.errorMessage("No se pudo crear la categoria");
      }
      })
    }
//auxiliar
// aux 

  resetVariables(){
    this.form.reset();
    this.submitted = false;
    this.category_id = 0;
  }
//aqui va el onSubmitUpdate
  onSubmitUpdate(){
    this.categoryService.updateCategory(this.form.value, this.category_id).subscribe({
      next: (v) => {
        this.getCategories();
        this.hideModalForm();
        this.resetVariables();
        this.swal.successMessage(v.message);
      },
      error: (e) => {
        console.log(e);
        this.swal.errorMessage(e.error.message);
      }
    });
  }

  //update category
  updateCategory(category: Category){
    this.resetVariables();
    this.showModalForm();
  
    this.category_id = category.category_id;
    this.form.controls['category'].setValue(category.category);
    this.form.controls['tag'].setValue(category.tag);
  }
  
}

