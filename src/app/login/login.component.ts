import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  @Output() loginSuccess = new EventEmitter<void>();
  username = '';
  password = '';
  loginError = false;

ngOnInit(): void {
  
}

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
    
    if (this.authService.login(this.username, this.password)) {
      console.log("paso a logueo")
      this.loginSuccess.emit();
      this.router.navigate(['']); // Navegar al componente principal
    } else {
      this.loginError = true;
    }
  }
}  

