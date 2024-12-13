import { Component } from '@angular/core';
import { CartService } from '../../../invoice/_service/cart.service';
import { ProductService } from '../../_service/product.service';
import { ProductImageService } from '../../_service/product-image.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SwalMessages } from '../../../../shared/swal-messages';
import { InvoiceService } from '../../../invoice/_service/invoice.service';

@Component({
  selector: 'app-product-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-cart.component.html',
  styleUrl: './product-cart.component.css'
})
export class ProductCartComponent {
  constructor(
    private productService: ProductService,
    private productImageService: ProductImageService,
    private route: ActivatedRoute,
    private router: Router,
    private carritoS: CartService,
    private invoiceS: InvoiceService
  ){}

  swal: SwalMessages =  new SwalMessages();

  carritoProductos: any
  ngOnInit(){
    this.getProductCart()
  }

  getProductCart(){
    this.carritoS.getCart().subscribe({
      next: (v) =>{
        this.carritoProductos=v;
        console.log("el carrito tiene: ",v)

        console.log(this.subTotalCarrito())
      },
      error: (e) =>{
        console.log("no se pudieron obtener los productos del carrito ", e)
      }

    });
  }

  deleteProductCart(id:number){
    this.carritoS.removeFromCart(id).subscribe({
      next: (v) =>{
        console.log("el carrito a eliminado el producto con el id",id)
        this.swal.successMessage("Se ha eliminado el producto con exito")
        
        this.getProductCart()
      },
      error: (e) =>{
        console.log("no se ha podido eliminar el producto del carrito", e)
        this.swal.errorMessage("No se ha logrado eliminar el producto con exito")
      }

    });
  }

  deleteCart(){
    this.carritoS.clearCart().subscribe({
      next: (v) =>{
        // this.carritoProductos=v;
        console.log("Se han eliminado todos los productos del carrito")
        this.swal.successMessage("Se han eliminado todos los productos del carrito")
        this.getProductCart()
      },
      error: (e) =>{
        this.swal.errorMessage("no se ha podido eliminar el carrito")
        console.log("no se ha podido eliminar el carrito", e)
      }

    });
  }
  generateInvoice(){
    this.invoiceS.generateInvoice(this.carritoProductos).subscribe({
      next: (v) =>{
        
        console.log("La compra ha finalizado con exito, se ha generado una factura", v)
        this.swal.successMessage("La compra ha finalizado con exito, se ha generado una factura")
        this.getProductCart()
      },
      error: (e) =>{
        console.log("no se ha podido finalizar la compra", e)
        this.swal.errorMessage("no se ha podido finalizar la compra")
      }

    });
  }

  subtotal(precio:any, quantity:any){
    return precio*quantity

  }
  subTotalCarrito() {
    return this.carritoProductos.reduce((total: number, producto: any) => {
      return total + this.subtotal(producto.product.price, producto.quantity); // Suma los subtotales de todos los productos
    }, 0);
  }

  redirect(){
    this.router.navigate(['/']);
  }
  
}
