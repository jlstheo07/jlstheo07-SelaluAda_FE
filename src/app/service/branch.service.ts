import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StaffResponseDTO, RegisterStaffRequestDTO } from '../model/staff.model';
import { Branch } from '../model/branch.model';


@Injectable({
  providedIn: 'root'
})
export class BranchService {
  private apiUrl = 'http://localhost:8080/api/wilayah';

  constructor(private http: HttpClient) {}

  // ✅ Mengambil daftar provinsi yang diurus oleh cabang tertentu
  getProvincesByBranch(branchId: string): Observable<{ id: number; name: string }[]> {
    return this.http.get<{ id: number; name: string }[]>(`${this.apiUrl}/branch/${branchId}/provinsi`);
  }

  // ✅ Mengupdate daftar provinsi yang diurus oleh cabang tertentu
  updateProvincesByBranch(branchId: string, provinceIds: number[]): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/branch/${branchId}/provinsi`, provinceIds);
  }

  // Jika kamu juga ingin tetap ambil semua provinsi
  getAllProvinces(): Observable<{ id: number; name: string }[]> {
    return this.http.get<{ id: number; name: string }[]>(`${this.apiUrl}/provinsi`);
  }
}