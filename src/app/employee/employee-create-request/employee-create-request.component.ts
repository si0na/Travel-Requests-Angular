import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TravelRequestService } from '../../travel-request.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-create-request',
  templateUrl: './employee-create-request.component.html',
  styleUrls: ['./employee-create-request.component.css']
})
export class EmployeeCreateRequestComponent implements OnInit {
  travelRequestForm!: FormGroup;

  constructor(private fb: FormBuilder, private travelRequestService: TravelRequestService) {}

  ngOnInit(): void {
    this.travelRequestForm = this.fb.group({
      departure_date: ['', Validators.required],
      return_date:  ['', Validators.required],
      mode_of_travel: ['', Validators.required],
      travel_purpose: ['', Validators.required],
      manager_name: ['sneha', Validators.required],  // Default value as Sneha
      destination: ['', Validators.required],
      origin: ['', Validators.required],
      additional_notes: [''],
      needs_lodging: [''],
      lodging_info: ['']
    });
  }

  submitRequest() {
    if (this.travelRequestForm.invalid) {
      Swal.fire({
        icon: 'warning',
        title: 'Incomplete Form',
        text: 'Please fill out all required fields.',
        confirmButtonColor: '#3085d6',
        width: '280px', 
          padding: '0.5rm', 
          customClass: {
        popup: 'compact-alert',
          }
      });
      return;
    }
  
    const requestData = this.travelRequestForm.value;
  
    console.log("Submitting Request:", requestData);
  
    this.travelRequestService.submitTravelRequest(requestData).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Request submitted successfully!',
          confirmButtonColor: '#28a745',
          width: '280px', 
          padding: '0.5rm', 
          customClass: {
        popup: 'compact-alert', 
      }
        });
        this.travelRequestForm.reset();
      },
      error: (error) => {
        console.error('Error submitting request:', error);
        Swal.fire({
          icon: 'error',
          title: 'Submission Failed',
          text: 'Failed to submit request. Please try again.',
          confirmButtonColor: '#d33',
          width: '280px', 
          padding: '0.5rm', 
          customClass: {
        popup: 'compact-alert', 
      }
        });
      }
    });
  }
  
}




