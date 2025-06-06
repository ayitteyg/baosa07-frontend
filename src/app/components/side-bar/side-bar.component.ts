import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-side-bar',
  standalone: false,
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {

  member_name:string |null=null;
  searchQuery: string = '';
  username: string = '';
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
      this.member_name = user.member_name
    }

    console.log('Logged in:', this.isLoggedIn, '| User:', this.username);
  }


  }
