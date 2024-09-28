import { Component } from '@angular/core';
import { CategoryService } from '../../_service/category.service';
import { Category } from '../../_model/category';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { SharedModule, SwalMessages } from '../../../../shared/shared-module';


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

  categories: Category[] = [];
  swal: SwalMessages = new SwalMessages();  
  //form: any;
  form: FormGroup;
  //submitted = false;
  submitted = false; // form submitted

  constructor(private categoryService: CategoryService, private formBuilder: FormBuilder) {    
    //this.form = this.formBuilder.group({
      //category : ["", Validators.required],
      //tag: ["", Validators.required]
    //}; 
    this.form = this.formBuilder.group({
      categoria: ["", [Validators.required]],
      tag: ["", [Validators.required]],
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

  ngOnInit(): void {
    this.getCategories();
    // $(document).ready(() => {
    //   console.log("jQuery está funcionando");
    // });
  }
  getCategories(): void {
    this.categories = this.categoryService.getCategories();
  }
  onSubmit(){
    this.submitted = true;
    if(this.form.invalid) return;
    this.submitted = false;

    let id = this.categories.length + 1;
    let categoria = new Category(id, this.form.controls['categoria'].value!, this.form.controls['tag'].value!, 1);
    this.categories.push(categoria);
    this.swal.successMessage("La región ha sido registrada");
    this.hideModalForm();

  }

  
}