import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TravelRequestService } from '../../travel-request.service';
import { Modal } from 'bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-past-request',
  templateUrl: './employee-past-request.component.html',
  styleUrl: './employee-past-request.component.css'
})
export class EmployeePastRequestComponent {
  travelRequests: any[] = [];
  selectedRequest: any = {}; 
  modalInstance: Modal | null = null;

  @ViewChild('viewRequestModal') viewRequestModal!: ElementRef;
  @ViewChild('resubmitModal') resubmitModal!: ElementRef;

  constructor(private pastRequestsService: TravelRequestService) {}

  ngOnInit() {
    this.fetchPastRequests();
  }

  fetchPastRequests() {
    this.pastRequestsService.getPastRequests().subscribe(
      (data: any) => {
        console.log('Fetched travel requests:', data);
        this.travelRequests = Array.isArray(data) ? data : [];
      },
      (error) => {
        console.error('Error fetching travel requests:', error);
      }
    );
  }

  selectRequest(request: any) {
    this.selectedRequest = { ...request };
  }

  viewRequest(request: any) {
    this.selectRequest(request);
    this.openModal(this.viewRequestModal);
  }

  openResubmitModal(request: any) {
    this.selectRequest(request);
    this.openModal(this.resubmitModal);
  }

  openModal(modalElementRef: ElementRef) {
    if (this.modalInstance) {
      this.modalInstance.hide();
    }
    const modalElement = modalElementRef.nativeElement;
    this.modalInstance = new Modal(modalElement, { backdrop: 'static', keyboard: false });
    this.modalInstance.show();
  }

  closeModal() {
    if (this.modalInstance) {
      this.modalInstance.hide();
      this.modalInstance = null;
    }
    this.selectedRequest = {};
  }

  submitResubmission() {
    if (!this.selectedRequest || !this.selectedRequest.id) {
      Swal.fire({
        icon: 'warning',
        title: 'No Request Selected',
        text: 'Please select a valid request to resubmit!',
      });
      return;
    }

    const updatedData = {
      id: this.selectedRequest.id,
      employee: this.selectedRequest.employee,
      manager_name: this.selectedRequest.manager_name,
      travel_purpose: this.selectedRequest.travel_purpose,
      departure_date: this.selectedRequest.departure_date,
      return_date: this.selectedRequest.return_date,
      mode_of_travel: this.selectedRequest.mode_of_travel,
      needs_lodging: this.selectedRequest.needs_lodging ? "yes" : "no",
      origin: this.selectedRequest.origin,
      destination: this.selectedRequest.destination,
      additional_notes: this.selectedRequest.additional_notes || "",
      resubmission_count: this.selectedRequest.resubmission_count + 1,
      status: this.selectedRequest.status, 
      lodging_info: this.selectedRequest.lodging_info || "", 
    };

    this.pastRequestsService.resubmit(this.selectedRequest.id, updatedData)
      .subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Request resubmitted successfully!',
            timer: 2000,
            showConfirmButton: false,
            width: '280px', 
          padding: '0.5rm', 
          customClass: {
        popup: 'compact-alert',
          }
          });
          this.closeModal();
          this.fetchPastRequests();
        },
        error: (error) => {
          console.error('Error updating request:', error);
          Swal.fire({
            icon: 'error',
            title: 'Failed to Resubmit!',
            text: `Reason: ${error.error?.message || "Unknown error"}`,
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
