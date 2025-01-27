import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProductComponent } from './create-product.component';
import { ProductService } from '../../../services/product.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { GeneralService } from '../../../services/general.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

describe('CreateProductComponent', () => {
  let component: CreateProductComponent;
  let fixture: ComponentFixture<CreateProductComponent>;
  let mockProductService: jest.Mocked<ProductService>;
  let mockGeneralService: jest.Mocked<GeneralService>;
  let mockRouter: jest.Mocked<Router>;

  beforeEach(async () => {
    // Crear mocks para los servicios y el router
    mockProductService = {
      getById: jest.fn(),
      create: jest.fn(),
    } as unknown as jest.Mocked<ProductService>;

    mockGeneralService = {
      openMessage: jest.fn(),
    } as unknown as jest.Mocked<GeneralService>;

    mockRouter = {
      navigate: jest.fn(),
    } as unknown as jest.Mocked<Router>;

    await TestBed.configureTestingModule({
      declarations: [CreateProductComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: ProductService, useValue: mockProductService },
        { provide: GeneralService, useValue: mockGeneralService },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty fields', () => {
    const form = component.productForm;
    expect(form.value).toEqual({
      name: '',
      category: '',
      stock: '',
      price: '',
    });
  });

  it('should call getById in showProduct and set the product', () => {
    const mockResponse = { id: 1, name: 'Test Product', category: 'Test Category', stock: 10, price: 100 };
    mockProductService.getById.mockReturnValue(of(mockResponse));

    component.showProduct();

    expect(mockProductService.getById).toHaveBeenCalledWith(1);
    expect(component.product).toEqual(mockResponse);
  });

  it('should handle error in showProduct if getById fails', () => {
    const mockError = { message: 'Error fetching product' };
    mockProductService.getById.mockReturnValue(throwError(() => mockError));

    component.showProduct();

    expect(mockProductService.getById).toHaveBeenCalledWith(1);
    expect(component.product).toEqual([]);
    // Puedes agregar más validaciones según el manejo de errores
  });

  it('should create a product successfully and navigate', () => {
    const mockResponse = { message: 'Product created successfully' };
    mockProductService.create.mockReturnValue(of(mockResponse));

    component.productForm.setValue({
      name: 'New Product',
      category: 'Category A',
      stock: 50,
      price: 500,
    });

    component.create();

    expect(mockProductService.create).toHaveBeenCalledWith({
      name: 'New Product',
      category: 'Category A',
      stock: 50,
      price: 500,
    });
    expect(mockGeneralService.openMessage).toHaveBeenCalledWith('Product created successfully', 'success');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/list-products']);
  });

  it('should handle error in create if service fails', () => {
    const mockError = { message: 'Error creating product' };
    mockProductService.create.mockReturnValue(throwError(() => mockError));

    component.productForm.setValue({
      name: 'New Product',
      category: 'Category A',
      stock: 50,
      price: 500,
    });

    component.create();

    expect(mockProductService.create).toHaveBeenCalledWith({
      name: 'New Product',
      category: 'Category A',
      stock: 50,
      price: 500,
    });
    expect(mockGeneralService.openMessage).toHaveBeenCalledWith('Error creating product', 'error');
  });

  it('should navigate to the home page on exit', () => {
    component.exit();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['']);
  });
});