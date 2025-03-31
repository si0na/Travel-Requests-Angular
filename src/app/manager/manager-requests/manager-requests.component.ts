import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TravelRequestService } from '../../travel-request.service';
import * as bootstrap from 'bootstrap';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-manager-requests',
  templateUrl: './manager-requests.component.html',
  styleUrls: ['./manager-requests.component.css']
})
export class ManagerRequestsComponent implements OnInit {
  requests: any[] = [];
  filteredRequests: any[] = [];
  selectedStatus: string = '';
  sortBy: string = '';
  selectedRequest: any = { admin_note: '' };;
  employeeNameFilter: string = '';
  dateFilter: string = '';
  request: { admin_note: string } | null = null;
  startDate: string = '';
  endDate: string = '';
  

  @ViewChild('viewRequestModal', { static: false }) viewRequestModal!: ElementRef;

  constructor(private travelRequestService: TravelRequestService) {}

  ngOnInit(): void {
    this.fetchRequests();
  }

  fetchRequests(): void {
    this.travelRequestService.getManagerRequests().subscribe(
      (data) => {
        console.log("API Response:", data);
        if (Array.isArray(data)) {
          this.requests = data;
          this.filteredRequests = [...this.requests];
        } else {
          this.requests = [];
          this.filteredRequests = [];
        }
      },
      (error) => console.error('Error fetching requests:', error)
    );
  }
 
  filterRequests(): void {
    if (!this.startDate || !this.endDate) {
      this.filteredRequests = [...this.requests]; // Reset to all requests if no range is selected
      return;
    }

    this.filteredRequests = this.requests.filter(request => {
      const requestDate = new Date(request.departure_date); // Use correct field from backend
      const start = new Date(this.startDate);
      const end = new Date(this.endDate);
      return requestDate >= start && requestDate <= end; // Filter within range
    });
  }


  sortRequests(): void {
    if (this.sortBy) {
        this.filteredRequests.sort((a, b) => {
            if (this.sortBy === 'status') {
                return a?.status.localeCompare(b?.status);
            }
            return new Date(a?.[this.sortBy] || 0).getTime() - new Date(b?.[this.sortBy] || 0).getTime();
        });
    }
}



  viewRequest(request: any): void {
    console.log("Selected Request:", request);
    this.selectedRequest = { ...request }; // Clone to avoid direct mutation
    setTimeout(() => {
        const modalInstance = new bootstrap.Modal(this.viewRequestModal.nativeElement);
        modalInstance.show();
    }, 100);
}


  closeModal(): void {
    const modalInstance = bootstrap.Modal.getInstance(this.viewRequestModal.nativeElement);
    if (modalInstance) modalInstance.hide();
    this.selectedRequest = null;
  }
  showErrorMessage(message: string): void {
    // Example: Use an alert or a UI notification service
    alert(message); // Replace with your UI framework's toast/notification service
  }
  

  closeApprovedRequest(): void {
    if (!this.selectedRequest) return;
  
    const requestId = this.selectedRequest.id;
    const body = { is_closed: true }; // ✅ Send required payload
  
    this.travelRequestService.closeRequest(requestId, body).subscribe({
      next: (response) => {
        console.log("✅ Request closed successfully", response);
        
        this.closeModal(); 
        this.fetchRequests(); 
      },
      error: (error) => {
        console.error("❌ Error closing request", error);
        
        // Optional: Show an error message in UI
        this.showErrorMessage("Failed to close request. Please try again.");
      }
    });
  }
 
  updateRequestStatus(status: string): void {
    if (!this.selectedRequest) return;
  
    if (status === 'additional_info_requested' && (!this.selectedRequest.manager_note || this.selectedRequest.manager_note.trim() === '')) {
      Swal.fire({
        icon: 'warning',
        title: 'Manager Note Required',
        text: 'Please enter a manager note before requesting additional information.',
        confirmButtonText: 'OK',
        width: '280px',
        padding: '0.5rem',
        customClass: { popup: 'compact-alert' },
      });
      return; // Stop execution if manager_note is missing
    }
  
    this.sendUpdateRequest(status, this.selectedRequest.manager_note);
  }
  
  sendUpdateRequest(status: string, managerNote: string = ''): void {
    const requestData: any = { status };
    if (status === 'additional_info_requested') {
      requestData.manager_note = managerNote;
    }
  
    console.log("🚀 Sending update request:", requestData);
  
    this.travelRequestService.updateRequest(this.selectedRequest.id, requestData).subscribe(
      () => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Request status updated successfully!',
          width: '280px',
          padding: '0.5rem',
          customClass: { popup: 'compact-alert' },
        });
        this.closeModal();
        this.fetchRequests();
      },
      (error) => {
        console.error('❌ Error updating request status:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to update request status!',
          width: '280px',
          padding: '0.5rem',
          customClass: { popup: 'compact-alert' },
        });
      }
    );
  }
  



}
