import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarComponent } from './sidebar.component';
import { Router } from '@angular/router';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let routerMock: any;

  beforeEach(async () => {
    // Mock del Router
    routerMock = {
      navigate: jasmine.createSpy('navigate'),
    };

    await TestBed.configureTestingModule({
      declarations: [SidebarComponent],
      providers: [
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle the sidebar state', () => {
    expect(component.isSidebarHidden).toBeFalse();

    component.toggleSidebar();
    expect(component.isSidebarHidden).toBeTrue();

    component.toggleSidebar();
    expect(component.isSidebarHidden).toBeFalse();
  });

  it('should emit the sidebarToggle event when toggled', () => {
    spyOn(component.sidebarToggle, 'emit');

    component.toggleSidebar();
    expect(component.sidebarToggle.emit).not.toHaveBeenCalled();
  });

  it('should navigate to "/create-product" on createProduct', () => {
    component.createProduct();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/create-product']);
  });

  it('should navigate to "/" on home', () => {
    component.home();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should navigate to "/list-products" on listProducts', () => {
    component.listProducts();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/list-products']);
  });

  it('should navigate to "/update-product" on updateProduct', () => {
    component.updateProduct();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/update-product']);
  });
});