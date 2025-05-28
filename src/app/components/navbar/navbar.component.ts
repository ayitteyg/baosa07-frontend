import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent implements OnInit {
  username: string | null = null;
  searchQuery: string = '';
  isLoggedIn: boolean = false;
  isExecutive:boolean=false;

  private router = inject(Router);
  private authService = inject(AuthService);

  ngOnInit() {
    const user = this.authService.getUser();
    this.isLoggedIn = this.authService.isLoggedIn();

    if (user) {
      this.username = user.username;
      this.isExecutive=user.isExexcutive;
    }

    console.log('Logged in:', this.isLoggedIn, '| User:', this.username);
  }

  onSearchChange() {
    console.log(this.searchQuery);
  }

  goTohome() {
    this.router.navigateByUrl('/home');
  }

  notificationCount: number = 3; // Replace with actual data
  goToNotifications() {
    console.log('Notifications clicked');
  }

  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}







