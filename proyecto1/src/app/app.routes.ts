import { Routes } from '@angular/router';
// import { MainComponent } from './modules/layout/component/main/main.component';
import { MainComponent } from './modules/layout/_component/main/main.component';
import { LoginComponent } from './modules/auth/_component/login/login.component';
//./modules/auth/_component/login/login.component.ts
import { RegisterComponent } from './modules/auth/_component/register/register.component';
import { SecuredComponent } from './modules/auth/_component/secured/secured.component';
import { authenticationGuard } from './modules/auth/authentication.guard';
import { CategoryComponent } from './modules/product/component/category/category.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/categoria',
        pathMatch: 'full'
    },
    {
        path: 'categoria',
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
    }

];