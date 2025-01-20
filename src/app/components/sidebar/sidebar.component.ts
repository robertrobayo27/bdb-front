import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  constructor(private router: Router) {}

  createProduct(){
    console.log("creacion de producto");
    this.router.navigate(['/create-product']);
  }

  
  home(){
    this.router.navigate(['/']);
  }

  updateProduct(){
    this.router.navigate(['/update-product']);
  }
}
