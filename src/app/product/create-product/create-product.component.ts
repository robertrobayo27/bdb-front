import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from '../../../services/general.service';

@Component({
  selector: 'app-create-product',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.scss'
})
export class CreateProductComponent implements OnInit{

   productForm: FormGroup = new FormGroup({});

    constructor(
      private fb: FormBuilder,
      private productService: ProductService,
      private generalService: GeneralService,
      private router: Router
    ) {}
  
    public type : any;
    public idProduct : any;
    public product: any= [];
    
    ngOnInit(): void {
    this.productForm = this.fb.group({
          name: ['', Validators.required],
          category: ['', Validators.required],
          stock: ['', Validators.required],
          price: ['', Validators.required],
      });
  
      this.productForm;
    }
  
    showProduct()
    {
      this.productService.getById(1).subscribe(
        (response: any) => {
          this.product = response;
          console.log("Product ", this.product)
        },
        (error: any) => {
          console.log(<any>error);
        }
      );
    }
  
    exit(){
      this.router.navigate(['']);
    }

    create(){
      console.log("creacion de producto");
      let data=
    {
      'name':this.productForm.value.name,
      'category' : this.productForm.value.category,
      'stock' : this.productForm.value.stock,
      'price' : this.productForm.value.price,
      
    };
    console.log("DATA ", data);
    this.productService.create(data).subscribe(
      (response:any) => {
        console.log("response ", response);
        this.generalService.openMessage(response.message, "success");
        this.router.navigate(['/list-products']);
      },
      (error:any) => {
        this.generalService.openMessage(error.message, "error");
        console.log(<any>error);
      }
    );
    }
}
