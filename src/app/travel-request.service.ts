import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TravelRequestService {
  private readonly baseUrl = 'http://127.0.0.1:8000/travel-requests';

  constructor(private http: HttpClient) {}
 
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login/`, credentials);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token'); // Check if token exists
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserRole(): string | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user).role : null;
  }

  logout(): void {
    localStorage.removeItem('token'); // Remove token
    localStorage.removeItem('user'); // Remove user details
  }

  submitTravelRequest(requestData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/employee/create/`, requestData, {
      headers: this.getAuthHeaders(),
    });
  }

  getPastRequests(): Observable<any> {
    return this.http.get(`${this.baseUrl}/employee/past-requests/`, {
      headers: this.getAuthHeaders(),
    });
  }

  resubmit(requestId: number, requestData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/employee/past-requests/resubmit/${requestId}/`, requestData, {
      headers: this.getAuthHeaders(),
    });
  }

  updateRequest(requestId: number, requestData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/admin/view-requests/update/${requestId}/`, requestData, {
      headers: this.getAuthHeaders(),
    });
  }

  getManagerRequests(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/view-requests/`, {
      headers: this.getAuthHeaders(),
    });
  }

  getEmployees(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/view-employees/`, {
      headers: this.getAuthHeaders(),
    });
  }
  
  removeEmployee(employeeId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/admin/remove/${employeeId}/`, {
      headers: this.getAuthHeaders(),
    });
  }

  closeRequest(requestId: number, body: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/admin/view-requests/${requestId}/close/`, body, {
      headers: this.getAuthHeaders(),
    });
  }

  addEmployee(employeeData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/admin/add-employee/`, employeeData, {
      headers: this.getAuthHeaders(),
    });
  }

  private getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Authorization': token ? `Token ${token}` : '',
      'Content-Type': 'application/json',
    });
  }
}

