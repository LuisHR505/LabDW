
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavService } from '../../_service/nav.service';
import { CommonModule } from '@angular/common';
import { navItems } from './navbar-data';
import { AppNavItemComponent } from "./nav-item/nav-item.component";
import { Category } from '../../../product/_model/category';
import { CategoryService } from '../../../product/_service/category.service';
import { SwalMessages } from '../../../../shared/swal-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, AppNavItemComponent,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  navItems = navItems;
  currentUrl?: string;
  categories: Category[] = []; // categories list
  swal: SwalMessages = new SwalMessages(); // swal messages

  constructor(
    private categoryService: CategoryService,
    private navService: NavService,
    private router: Router
  ){}

  ngOnInit() {
    this.navService.currentUrl.subscribe((url: string) => { this.currentUrl = url;});
    this.getCategories()
  }

  ngOnChanges() {
    this.navService.currentUrl.subscribe((url: string) => { this.currentUrl = url});
  }

  getCategories(){
    this.categoryService.getActiveCategorias().subscribe({
      next: (v) => {
        this.categories = v;
      },
      error: (e) => {
        console.log(e);
        this.swal.errorMessage(e.error!.message); // show message
      }
    });
  }

     //redirect
     redirect(){
      this.router.navigate(['']);
    }
     //redirect
     redirectProductCart(){
      this.router.navigate(['/product-cart']);
    }
    //redirect
    redirectProduct(){
      this.router.navigate(['/product']);
    }
    //redirect
    redirectInvoice(){
      this.router.navigate(['/invoice']);
    }
}