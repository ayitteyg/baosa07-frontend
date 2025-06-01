import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-cover-page',
  standalone: false,
  templateUrl: './cover-page.component.html',
  styleUrl: './cover-page.component.css'
})
export class CoverPageComponent {

  isLoggedIn: boolean = false;
  isExecutive:boolean=false;

  private router = inject(Router);
  private authService = inject(AuthService);


  
  ngOnInit() {
    const user = this.authService.getUser();
    this.isLoggedIn = this.authService.isLoggedIn();

    console.log(user.isExecutive)
    }

    logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }


}
