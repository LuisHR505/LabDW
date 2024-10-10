import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import Swal from "sweetalert2";
import { CommonModule } from "@angular/common";

@NgModule({
    imports: [FormsModule, ReactiveFormsModule,CommonModule],
    exports: [FormsModule, ReactiveFormsModule,CommonModule],
})
export class SharedModule{}

