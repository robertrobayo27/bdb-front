import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
    constructor(private router: Router) {}
  private readonly validUsername = 'admin';
  private readonly validPassword = '1234';

  private loggedIn = new BehaviorSubject<boolean>(false);  
  isLoggedIn$ = this.loggedIn.asObservable();  

  login(username: string, password: string): boolean {
    if (username === this.validUsername && password === this.validPassword) {
        localStorage.setItem('isLoggedIn', 'true');  
        this.loggedIn.next(true);
      return true;
    }
    return false;
  }

  logout(): void {
    this.loggedIn.next(false);
    localStorage.removeItem('isLoggedIn'); // Limpiar sesión
    this.router.navigate(['/login']); // Redirigir al login
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true'; 
  }
}