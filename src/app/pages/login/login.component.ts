import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';



@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})



export class LoginComponent {
  loginForm: FormGroup;
  isSubmitted = false;
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) 
  
  
  {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // Getter for easy access to form fields
  get formControls() {
    return this.loginForm.controls;
  }

onSubmit() {
  this.isSubmitted = true;

  if (this.loginForm.invalid) {
    return;
  }

  const { username, password } = this.loginForm.value;

  console.log('Login credentials:', this.loginForm.value);


  this.authService.login(username.trim(), password.trim()).subscribe({
    next: (response) => {
      // Save full user info
      localStorage.setItem('token', response.token);
      localStorage.setItem('currentUser', JSON.stringify({
        id: response.id,
        username: response.username,
        is_executive: response.is_executive,
        
      }));

      console.log(localStorage)
      console.log(response.username, password);

      this.router.navigate(['member/receipts']);
      // this.router.navigate(['member/receipts']);
    },
    error: (err) => { 
      this.errorMessage = 'Invalid username or password';
       console.error('Login error:', err.error);
       this.errorMessage = err.error?.non_field_errors?.[0] || 'Login failed';
    }
  });
}


}

