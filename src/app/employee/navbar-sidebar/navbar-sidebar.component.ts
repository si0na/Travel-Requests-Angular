import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar-sidebar',
  templateUrl: './navbar-sidebar.component.html',
  styleUrl: './navbar-sidebar.component.css'
})
export class NavbarSidebarComponent {
@Output() sidebarToggled = new EventEmitter<void>();

  toggleSidebar() {
    this.sidebarToggled.emit();
  }
  constructor(private router: Router) {}
  confirmLogout() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      width: '280px', 
      padding: '0.5rm', 
      confirmButtonText: 'Yes, log out!',
      customClass: {
        popup: 'compact-alert', 
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.logout();
      }
    });
  }
  logout() {
    localStorage.removeItem('token'); // ✅ Remove authentication token
    localStorage.removeItem('user'); // ✅ Remove user data

    // Redirect to login page
    this.router.navigate(['/login']).then(() => {
      window.location.reload(); // ✅ Ensures full session clear
    });
  }
}



