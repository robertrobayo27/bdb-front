import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {NgbModule, NgbPaginationConfig} from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../../../services/product.service';
import { CommonModule } from '@angular/common';
import { GeneralService } from '../../../services/general.service';
import { Product } from '../../../models/product.model';
@Component({
  selector: 'app-list-product',
  imports: [CommonModule, NgbModule],
  templateUrl: './list-product.component.html',
  styleUrl: './list-product.component.scss'
})
export class ListProductComponent implements OnInit{
  
  list: Product[] = [];
  pageSize = 5; // Cantidad de productos por página  
  currentPage = 1; 

  constructor(


    private ProductService: ProductService,
    private generalService: GeneralService,
    private config: NgbPaginationConfig,
    private router: Router
  ) {}



  ngOnInit() {
    this.listProducts();
  }

   get paginatedProducts() {  
    const startIndex = (this.currentPage - 1) * this.pageSize;  
    const endIndex = startIndex + this.pageSize;  
    return this.list  
    .slice(startIndex, endIndex); // Devuelve solo los elementos de la página actual  
  }    

  // Cambia la página actual  
  changePage(page: number):void {  
    if (page > 0 && page <= this.totalPages) {  
      this.currentPage = page;  
    }    
  }  

  // Calcular el total de páginas  
  get totalPages() {  
    return Math.ceil(this.list.filter(product => !product.deleted).length / this.pageSize); 
  }

  updateProduct(id:number){
    this.router.navigate(['/update-product/' + id]);
  }

  listProducts(){
    this.ProductService.listAll().subscribe(
      (response:Product[]) => {
        this.list = response;
        console.log("List de productos ", this.list);
      },
      (error:any) => {
        console.log(<any>error);
      }
    );
  }

  deleteProduct(id:number){
    console.log("eliminacion de producto");
    this.ProductService.delete(id).subscribe(
      (response:any) => {
        this.list = response;
        console.log("response ", response);
        this.generalService.openMessage(response.message, "success");
        setTimeout(() => {  
          window.location.reload();  
        }, 2000);
      },
      (error:any) => {
        this.generalService.openMessage(error.message, "error");
        console.log(<any>error);
      }
    );
  }
}
