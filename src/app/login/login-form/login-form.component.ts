import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TravelRequestService } from '../../travel-request.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private travelRequestService: TravelRequestService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.travelRequestService.login(this.loginForm.value).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));

        Swal.fire({
          icon: 'success',
          title: 'Login Successful!',
          text: `Welcome, ${response.user.role}!`,
          timer: 1500,
          showConfirmButton: false,
          heightAuto: false,  
          width: '300px'      
        });

        if (response.user.role === 'admin') {
          this.router.navigate(['/admin']);
        } else if (response.user.role === 'employee') {
          this.router.navigate(['/employee']);
        } else if (response.user.role === 'manager') {
          this.router.navigate(['/manager']);
        }
      },
      error: () => {
        this.errorMessage = 'Invalid email or password';
        Swal.fire({
          icon: 'error',
          title: 'Login Failed!',
          text: 'Invalid email or password',
          timer: 1500,
          showConfirmButton: false,
          heightAuto: false,
          width: '300px'
        });
      }
    });
  }
}

