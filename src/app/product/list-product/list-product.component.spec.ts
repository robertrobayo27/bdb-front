import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProductComponent } from './list-product.component';
import { of, throwError } from 'rxjs';
import { GeneralService } from '../../../services/general.service';
import { ProductService } from '../../../services/product.service';
import { Router } from '@angular/router';

describe('ListProductComponent', () => {
  let component: ListProductComponent;
  let fixture: ComponentFixture<ListProductComponent>;
  let mockProductService: jest.Mocked<ProductService>;
  let mockGeneralService: jest.Mocked<GeneralService>;
  let mockRouter: jest.Mocked<Router>;

  beforeEach(async () => {
    // Mocking services
    mockProductService = {
      listAll: jest.fn(),
      delete: jest.fn(),
    } as any;
    
    mockGeneralService = {
      openMessage: jest.fn(),
    } as any;

    mockRouter = {
      navigate: jest.fn(),
    } as any;

    await TestBed.configureTestingModule({
      declarations: [ ListProductComponent ],
      providers: [
        { provide: ProductService, useValue: mockProductService },
        { provide: GeneralService, useValue: mockGeneralService },
        { provide: Router, useValue: mockRouter },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

 
});
