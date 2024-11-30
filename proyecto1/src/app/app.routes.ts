import { Routes } from '@angular/router';
// import { MainComponent } from './modules/layout/component/main/main.component';
import { MainComponent } from './modules/layout/_component/main/main.component';
import { LoginComponent } from './modules/auth/_component/login/login.component';
//./modules/auth/_component/login/login.component.ts
import { RegisterComponent } from './modules/auth/_component/register/register.component';
import { SecuredComponent } from './modules/auth/_component/secured/secured.component';
import { authenticationGuard } from './modules/auth/authentication.guard';
import { CategoryComponent } from './modules/product/component/category/category.component';
import { ProductComponent } from './modules/product/component/product/product.component';
import { ProductImageComponent } from './modules/product/component/product-image/product-image.component';
import { HomeComponent } from './modules/layout/_component/home/home.component';
import { CategoriaEspecificaComponent } from './modules/product/component/categoria-especifica/categoria-especifica.component';
import { CustomerProductComponent } from './modules/product/component/customer-product/customer-product.component';
import { ProductCartComponent } from './modules/product/component/product-cart/product-cart.component';
import { InvoiceComponent } from './modules/invoice/component/invoice/invoice.component';
import { InvoiceDetailComponent } from './modules/invoice/component/invoice-detail/invoice-detail.component';
import { CustomerComponent } from './modules/customer/component/customer/customer.component';
import { CustomerImageComponent } from './modules/customer/component/customer-image/customer-image.component';
import { RegionComponent } from './modules/customer/component/region/region.component';


export const routes: Routes = [
    {
         path: '', component: HomeComponent 
    }, 
    // {
    //     path: '',
    //     redirectTo: '/category',
    //     pathMatch: 'full'
    // },
    {
        path: 'category',
        component: CategoryComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'secured',
        component: SecuredComponent, 
        canActivate: [authenticationGuard]
    },
    {
        path:'product',
        component: ProductComponent
    },
    {
        path:'product/:gtin',
        component: ProductImageComponent
    },
    {
        path:'product/category/:id',
        component: CategoriaEspecificaComponent 
    },
    {
        path:'customerProduct/:gtin',
        component:CustomerProductComponent 
    },

    {
         path: 'product-cart', component: ProductCartComponent 
    },
    {
         path: 'invoice', component:  InvoiceComponent
    },
    {
         path: 'invoice-detail/:id', component:  InvoiceDetailComponent
    },
    {
        path: 'customer',
        component: CustomerComponent
        //canActivate: [adminGuard]
    },
    {
        path: 'customer/:rfc',
        component: CustomerImageComponent
        //canActivate: [authGuard]
    },
    {
        path: 'region',
        component: RegionComponent
    },




];