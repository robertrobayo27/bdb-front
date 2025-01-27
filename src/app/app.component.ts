import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { FooterComponent } from "./components/footer/footer.component";
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, HeaderComponent, SidebarComponent, FooterComponent, CommonModule, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'bdb-front';

  isLoggedIn : boolean = false;

  isSidebarHidden = false; // Inicializa el estado

  // Método que actualiza el estado cuando se emite el evento
  onSidebarToggle(hidden: boolean) {
    this.isSidebarHidden = hidden;
  }

  constructor(private authService: AuthService) {}  

  ngOnInit() {  
    this.isLoggedIn = this.authService.isLoggedIn();   
  
    this.authService.isLoggedIn$.subscribe((loggedIn : any) => {  
      this.isLoggedIn = loggedIn;  
    });  

    this.updateLoginStatus();  
  }  

  updateLoginStatus(): void {  
    this.isLoggedIn = this.authService.isLoggedIn();  
    console.log("valor de isLoggedIn desde app component", this.isLoggedIn);  
  }  
}
