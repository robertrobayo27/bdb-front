import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AuthService } from '../services/auth.service';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AppComponent', () => {
  let component: AppComponent;  
  let fixture: ComponentFixture<AppComponent>;  
  let authServiceMock: any;  

  beforeEach(async () => {  
    authServiceMock = {  
      isLoggedIn: jest.fn(),  
      isLoggedIn$: of(false), // Inicialmente falso  
    };  

    await TestBed.configureTestingModule({  
      declarations: [AppComponent],  
      providers: [{ provide: AuthService, useValue: authServiceMock }],  
      schemas: [NO_ERRORS_SCHEMA], // Evita errores de componentes no declarados  
    }).compileComponents();  

    fixture = TestBed.createComponent(AppComponent);  
    component = fixture.componentInstance;  
  });  

  it('should create the component', () => {  
    expect(component).toBeTruthy();  
  });  

  it('should initialize title', () => {  
    expect(component.title).toEqual('bdb-front');  
  });  

  it('should set isLoggedIn correctly on ngOnInit', () => {  
    authServiceMock.isLoggedIn.mockReturnValueOnce(true); // Simula que el usuario está logueado  
    component.ngOnInit();  
    expect(component.isLoggedIn).toBe(true);  
  });  

  it('should toggle isSidebarHidden', () => {  
    expect(component.isSidebarHidden).toBe(false);  
    component.onSidebarToggle(true);  
    expect(component.isSidebarHidden).toBe(true);  
  });  

  it('should log the value of isLoggedIn', () => {  
    const consoleSpy = jest.spyOn(console, 'log');  
    component.updateLoginStatus();  
    expect(consoleSpy).toHaveBeenCalledWith("valor de isLoggedIn desde app component", false);  
  });  
});  
