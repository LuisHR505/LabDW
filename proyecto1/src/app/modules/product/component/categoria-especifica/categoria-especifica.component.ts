import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CaterogriaEspecificaService } from '../../_service/caterogria-especifica.service';
import { Product } from '../../_model/product';
import { ProductImage } from '../../_model/product_image';
import { SwalMessages } from '../../../../shared/swal-messages';
import { Router } from '@angular/router';
@Component({
  selector: 'app-categoria-especifica',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categoria-especifica.component.html',
  styleUrl: './categoria-especifica.component.css'
})
export class CategoriaEspecificaComponent {

    constructor(private categoriaEspecificaS:CaterogriaEspecificaService,
      private route: ActivatedRoute,
      private router: Router
    ){
    }
    productos: any []=[]
    swal: SwalMessages = new SwalMessages();
    categoriaId: number = 0
    
    // ngOnInit(): void {
    //   this.getProductosByCategoria();
    // }
    ngOnInit(): void {
      // Obtiene el ID de la categoría de los parámetros de la ruta
      this.route.paramMap.subscribe(params => {
        const id = params.get('id');
        if (id) {
          this.categoriaId = +id; // Convierte el ID a número
          this.getProductosByCategoria(this.categoriaId);
        }
      });
    }

  getProductosByCategoria(categoriaId:number){
    this.categoriaEspecificaS.getCategoryProducts(categoriaId).subscribe({
      next: (v) =>{
        console.log(v)
        this.productos=v
        console.log(this.productos)

      },
      error: (e) => {
        this.swal.errorMessage("No hay un listado de categorias")
      }


    });
  }

   //redirect
   redirect(gtin: number){
    this.router.navigate(['customerProduct/'+gtin]);
  }

}
