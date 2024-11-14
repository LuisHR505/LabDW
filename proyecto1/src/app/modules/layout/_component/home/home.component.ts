import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { ProductService } from '../../../product/_service/product.service';
import { ProductImageService } from '../../../product/_service/product-image.service';
import { Product } from '../../../product/_model/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  productos: any[] = [];  // Lista de productos
  loading: boolean = true; // Indicador de carga
  error: boolean = false;  // Indicador de error

  // Inyectar el servicio ProductService
  constructor(
    private productService: ProductService,
    private productImageService: ProductImageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Llamar al servicio para obtener los productos
    this.productService.getProducts().subscribe(
      (v) => {
        this.productos = v;   // Asignar los productos a la variable
        console.log(this.productos)
        this.loadProductImages();
        this.loading = false;     // Detener el indicador de carga
      },
      (error) => {
        console.error('Error al obtener los productos', error);
        this.error = true;        // Activar el indicador de error
        this.loading = false;     // Detener el indicador de carga
      }
    );
  }

  // Función para cargar las imágenes de los productos
  loadProductImages() {
    this.productos.forEach((producto) => {
      console.log('ID del producto:', producto.product_id);
      this.getProductImages2(producto.product_id,producto); // Llamamos a la función que obtiene la imagen
    });
  }

  // Función para obtener la imagen de un producto
  // getProductImages(id: number) {
  //   this.productImageService.getProductImage(id).subscribe({
  //     next: (v) => {
  //       producto.productImgs = v;
  //       console.log('Imagen cargada:', v);
  //     },
  //     error: (e) => {
  //       console.error(`Error al obtener la imagen para el producto ${id}`, e);
  //     }
  //   });
  // }

  getProductImages2(id: number, producto: any) {
    this.productImageService.getProductImage(id).subscribe({
      next: (v) => {
        console.log('Imagen cargada:', v);
        
        // Si encontramos una imagen, la asignamos al producto
        if (v && v.length > 0) {
          producto.imageUrl = v[0].image;  // Asumimos que la imagen está en base64
          console.log(producto.imageUrl)
        } else {
          // Si no hay imagen, asignamos una imagen predeterminada
          producto.imageUrl = 'https://dummyimage.com/450x300/dee2e6/6c757d.jpg';
        }
      },
      error: (e) => {
        console.error(`Error al obtener la imagen para el producto ${id}`, e);
        producto.imageUrl = 'https://dummyimage.com/450x300/dee2e6/6c757d.jpg';  // Imagen predeterminada en caso de error
      }
    });
  }
    //redirect
    redirect(gtin: number){
      this.router.navigate(['customerProduct/'+gtin]);
    }

}
