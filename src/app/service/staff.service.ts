import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StaffResponseDTO, RegisterStaffRequestDTO } from '../model/staff.model';
import { Branch } from '../model/branch.model';


@Injectable({
  providedIn: 'root'
})
export class StaffService {
  private apiUrl = 'http://localhost:8080/api/staff';

  constructor(private http: HttpClient) {}

  getAllStaffs(): Observable<StaffResponseDTO[]> {
    return this.http.get<StaffResponseDTO[]>(this.apiUrl);
  }

  getStaffById(id: string): Observable<StaffResponseDTO> {
    return this.http.get<StaffResponseDTO>(`${this.apiUrl}/${id}`);
  }

  registerStaff(payload: RegisterStaffRequestDTO): Observable<any> {
    return this.http.post(this.apiUrl + '/register', payload);
  }

  updateStaff(id: string, payload: RegisterStaffRequestDTO): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, payload);
  }

  deleteStaff(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getMyBranch(): Observable<Branch> {
    return this.http.get<Branch>(`${this.apiUrl}/my-branch`);
  }

  getBranches(): Observable<Branch[]> {
    return this.http.get<Branch[]>(`${this.apiUrl}/branches`);
  }
}