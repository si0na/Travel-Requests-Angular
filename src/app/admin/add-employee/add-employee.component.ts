import { Component } from '@angular/core';
import { TravelRequestService } from '../../travel-request.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent {
  employee = { employee_name: '', employee_email: '', password: '', manager: 'Sneha' };

  constructor(private travelRequestService: TravelRequestService) {}

  submitEmployee(): void {
    this.travelRequestService.addEmployee(this.employee).subscribe({
      next: (response) => {
        console.log('✅ Employee added successfully:', response);
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Employee added successfully!',
          width: '280px',
          padding: '0.5rem',
          customClass: { popup: 'compact-alert' },
        });
      },
      error: (error) => {
        console.error('❌ Error adding employee:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Failed to add employee. Please try again!',
          width: '280px',
          padding: '0.5rem',
          customClass: { popup: 'compact-alert' },
        });
      }
    });
  }
}



