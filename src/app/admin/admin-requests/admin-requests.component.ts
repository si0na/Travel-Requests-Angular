import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TravelRequestService } from '../../travel-request.service';
import * as bootstrap from 'bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-requests',
  templateUrl: './admin-requests.component.html',
  styleUrl: './admin-requests.component.css'
})
export class AdminRequestsComponent {
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
    const filters: any = {};
  
    if (this.employeeNameFilter) {
      filters.employee_name = this.employeeNameFilter;
    }
    if (this.startDate) {
      filters.start_date = this.startDate;
    }
    if (this.endDate) {
      filters.end_date = this.endDate;
    }
    if (this.selectedStatus) {
      filters.status = this.selectedStatus;  // ✅ Include status filter
    }
  
    this.travelRequestService.getManagerRequests(filters).subscribe({
      next: (response) => {
        this.filteredRequests = response;
      },
      error: (error) => {
        console.error('Error fetching filtered travel requests:', error);
      }
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
        Swal.fire({
          title: 'Success!',
          text: 'Request has been successfully closed.',
          icon: 'success',
          confirmButtonText: 'Okay',
          width: '280px',
        padding: '0.5rem',
        customClass: { popup: 'compact-alert' },
        });
  
        
        this.closeModal(); 
        this.fetchRequests(); 
      },
      error: (error) => {
        console.error("❌ Error closing request", error);
        Swal.fire({
          title: 'Error!',
          text: 'Failed to close request. Please try again.',
          icon: 'error',
          confirmButtonText: 'Okay'
        });
        
        
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
