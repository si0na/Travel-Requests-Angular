import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TravelRequestService } from '../../travel-request.service';



@Component({
  selector: 'app-employee-create-request',
  templateUrl: './employee-create-request.component.html',
  styleUrls: ['./employee-create-request.component.css']
})
export class EmployeeCreateRequestComponent implements OnInit {
  travelRequestForm!: FormGroup;  // Define FormGroup

  constructor(
    private fb: FormBuilder,
    private travelRequestsService: TravelRequestService
  ) {}

  ngOnInit() {
    this.travelRequestForm = this.fb.group({
      travel_purpose: ['', Validators.required],
      departure_date: ['', Validators.required],
      return_date: ['', Validators.required],
      additional_notes: [''],
      mode_of_travel: ['', Validators.required],
      needs_lodging: ['', Validators.required],
      destination: ['', Validators.required],
      origin: ['', Validators.required]
    });
  }

  submitRequest() {
    if (this.travelRequestForm.invalid) {
      alert('Please fill out all required fields.');
      return;
    }

    const requestData = this.travelRequestForm.value;

    console.log("Submitting Request:", requestData);

    this.travelRequestsService.submitTravelRequest(requestData).subscribe({
      next: () => {
        alert('Request submitted successfully!');
        this.travelRequestForm.reset();
      },
      error: (error) => {
        console.error('Error submitting request:', error);
        alert('Failed to submit request. Please try again.');
      }
    });
  }
}



