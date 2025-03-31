import { Component } from '@angular/core';
import { TravelRequestService } from '../../travel-request.service';
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {
  employees: any[] = [];
  errorMessage: string | null = null;
  loading: boolean = false;

  constructor(private travelRequestService: TravelRequestService) {}
  searchText: string = '';
  ngOnInit(): void {
    this.fetchEmployees();
  }

  fetchEmployees(): void {
    this.loading = true;
    this.travelRequestService.getEmployees().subscribe({
      next: (data) => {
        this.employees = data;
        console.log(data);
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to fetch employees.';
        console.error('Error fetching employees:', error);
        this.loading = false;
      }
    });
  }
  
  removeEmployee(index: number): void {
    console.log('Removing Employee at index:', index);
  
    if (!this.employees || this.employees.length === 0) {
      console.error('Error: Employees list is empty or not loaded.');
      return;
    }
  
    console.log('Employee Object:', this.employees[index]); // Debugging
  
    const employeeId = this.employees[index]?.employee_id; // Safe access
  
    console.log('Employee ID:', employeeId); // Check if it's undefined
  
    if (!employeeId) {
      alert('Error: Employee ID is undefined!');
      return;
    }
  
    const confirmDelete = confirm('Are you sure you want to remove this employee?');
  
    if (confirmDelete) {
      this.travelRequestService.removeEmployee(employeeId).subscribe({
        next: () => {
          this.employees.splice(index, 1);
          alert('Employee removed successfully!');
        },
        error: (error) => {
          console.error('Error removing employee:', error);
          alert('Failed to remove employee.');
        }
      });
    }
  }
  
  

}
