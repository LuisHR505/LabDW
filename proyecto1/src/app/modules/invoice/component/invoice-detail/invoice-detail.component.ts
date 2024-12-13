import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Invoice } from '../../_model/invoice';
import { SwalMessages } from '../../../../shared/swal-messages';
import { InvoiceService } from '../../_service/invoice.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-invoice-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './invoice-detail.component.html',
  styleUrl: './invoice-detail.component.css'
})
export class InvoiceDetailComponent {

  id: number = 0; // invoice id
  invoice: Invoice = new Invoice();
  
  //variables para mostrar los elementos de la factura:
  productos:any

  loading = false; // loading request
  swal: SwalMessages = new SwalMessages(); // swal messages

  constructor(
    private invoiceService: InvoiceService,
    private route: ActivatedRoute,
    private router: Router,
  ){}

  ngOnInit(){
    this.id = +this.route.snapshot.paramMap.get('id')!;
    if(this.id){
      this.getInvoice();
    }else{
      this.swal.errorMessage("El id de la factura es inválido"); 
    }
  }

  getInvoice(){
    this.loading = true;
    this.invoiceService.getInvoice(this.id).subscribe({
      next: (v) => {
        this.invoice = v;
        console.log(v);
        this.loading = false;
        // this.productos= v.items
        console.log(this.invoice.items);
        
        
      },
      error: (e) => {
        console.error(e);
        this.loading = false;
      }
    });
  }
  //redirect
  redirect(){
    this.router.navigate(['/invoice']);
  }

}
