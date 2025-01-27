import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  isSidebarHidden = false;

  @Output() sidebarToggle = new EventEmitter<boolean>();
  
  toggleSidebar() {
    this.isSidebarHidden = !this.isSidebarHidden;
  }

  constructor(private router: Router) {}

  createProduct(){
    console.log("creacion de producto");
    this.router.navigate(['/create-product']);
  }
  
  home(){
    this.router.navigate(['/']);
  }

  listProducts(){
    this.router.navigate(['/list-products']);
  }

  updateProduct(){
    this.router.navigate(['/update-product']);
  }
}
