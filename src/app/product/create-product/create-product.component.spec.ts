import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProductComponent } from './create-product.component';
import { ProductService } from '../../../services/product.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('CreateProductComponent', () => {
  let component: CreateProductComponent;
  let fixture: ComponentFixture<CreateProductComponent>;
  let mockProductService: jest.Mocked<ProductService>;

  beforeEach(async () => {
    mockProductService = {
      create: jest.fn(),
    } as any;

    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,  // Importación correcta del módulo de pruebas
        RouterTestingModule,
      ],
      declarations: [CreateProductComponent],
      providers: [
        { provide: ProductService, useValue: mockProductService },
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
