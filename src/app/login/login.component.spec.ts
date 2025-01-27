import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceMock: any;
  let routerMock: any;

  beforeEach(async () => {
    // Mock del AuthService
    authServiceMock = {
      login: jest.fn(),
    };

    // Mock del Router
    routerMock = {
      navigate: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [FormsModule, ReactiveFormsModule],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit loginSuccess and navigate on successful login', () => {
    // Configurar el mock del login para devolver true
    authServiceMock.login.mockReturnValue(true);

    const loginSuccessSpy = jest.spyOn(component.loginSuccess, 'emit');
    component.username = 'testuser';
    component.password = 'password123';

    component.onLogin();

    expect(authServiceMock.login).toHaveBeenCalledWith('testuser', 'password123');
    expect(loginSuccessSpy).toHaveBeenCalled();
    expect(routerMock.navigate).toHaveBeenCalledWith(['']);
    expect(component.loginError).toBe(false);
  });

  it('should set loginError to true on failed login', () => {
    // Configurar el mock del login para devolver false
    authServiceMock.login.mockReturnValue(false);

    component.username = 'testuser';
    component.password = 'wrongpassword';

    component.onLogin();

    expect(authServiceMock.login).toHaveBeenCalledWith('testuser', 'wrongpassword');
    expect(component.loginError).toBe(true);
    expect(routerMock.navigate).not.toHaveBeenCalled();
  });
});