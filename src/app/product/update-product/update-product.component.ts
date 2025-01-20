import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule, Form, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product.model';
import { GeneralService } from '../../../services/general.service';

@Component({
  selector: 'app-update-product',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.scss'
})
export class UpdateProductComponent implements OnInit{

  productForm: FormGroup = new FormGroup({});
  constructor(
    private productService: ProductService,
    private generalService: GeneralService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder :FormBuilder
  ) {}

  public type : any;
  public idProduct : any;
  public product: any= [];
  ngOnInit() {
    this.route.params.subscribe( params => this.idProduct = params['id']);
    this.showProduct();

    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      stock: ['', Validators.required],
      price: ['', Validators.required],
  });


}

  showProduct()
  {
    this.productService.getById(this.idProduct).subscribe(
      (response: Product) => {
        this.product = response;
        console.log("Product ", this.product)
      },
      (error: any) => {
        console.log(<any>error);
      }
    );
  }

  update(){
    console.log("actualizando producto");
    let data=
  {
    'id':this.product.id,
    'name':this.productForm.value.name,
    'category' : this.productForm.value.category,
    'stock' : this.productForm.value.stock,
    'price' : this.productForm.value.price,
    
  };
  console.log("DATA ", data);
  this.productService.update(data).subscribe(
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
  

  exit(){
    this.router.navigate(['']);
  }
}
