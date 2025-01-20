import { NgModule } from '@angular/core';  
import { RouterModule, Routes } from '@angular/router';  
import { CreateProductComponent } from './product/create-product/create-product.component';  
import { UpdateProductComponent } from './product/update-product/update-product.component';  
import { ListProductComponent } from './product/list-product/list-product.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard]},
    { path: 'login', component: LoginComponent},
    { path: 'create-product', component: CreateProductComponent,  canActivate: [AuthGuard]},  
    { path: 'update-product/:id', component: UpdateProductComponent,  canActivate: [AuthGuard]  },  
    { path: 'list-products', component: ListProductComponent,  canActivate: [AuthGuard]},  
    { path: '**', redirectTo: '/login', pathMatch: 'full' }
  ];

  @NgModule({  
    imports: [RouterModule.forRoot(routes)],  
    exports: [RouterModule]  
  })  
  export class AppRoutingModule { }
