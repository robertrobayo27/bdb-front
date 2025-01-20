import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { CommonModule } from '@angular/common';
import { GeneralService } from '../../../services/general.service';
@Component({
  selector: 'app-list-product',
  imports: [CommonModule],
  templateUrl: './list-product.component.html',
  styleUrl: './list-product.component.scss'
})
export class ListProductComponent implements OnInit{
  
  constructor(
    private ProductService: ProductService,
    private generalService: GeneralService,
    private router: Router
  ) { }

  public list: any = [];

  
  ngOnInit(): void {
    this.listProducts();
  }

  updateProduct(id:number):void{
    this.router.navigate(['/update-product/' + id]);
  }

  listProducts(){
    this.ProductService.listAll().subscribe(
      (response:any) => {
        this.list = response;
        console.log("List de productos ", this.list);
      },
      (error:any) => {
        console.log(<any>error);
      }
    );
  }

  deleteProduct(id:number):void{
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
