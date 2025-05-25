import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AuthResponse {
  token: string;
  role_id: string;
  username: string;
  role: string;
  customerId: string;
}

export interface ResetPasswordResponse {
  message: string;
  // bisa ditambahkan field lain sesuai response backend
}

export interface ForgotPasswordResponse {
  message: string;
  // bisa ditambahkan field lain jika backend mengirim lebih banyak info
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/auth'; // base URL backend

  constructor(private http: HttpClient) {}

  login(usernameOrEmail: string, password: string): Observable<AuthResponse> {
    const body = { usernameOrEmail, password };
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, body);
  }

  changePassword(oldPassword: string, newPassword: string): Observable<HttpResponse<any>> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    const body = { oldPassword, newPassword };

    return this.http.put<any>(`${this.baseUrl}/change-password`, body, {
      headers,
      observe: 'response',
    });
  }

  // Reset password tanpa login, cukup kirim token dan password baru
  resetPassword(token: string, newPassword: string): Observable<ResetPasswordResponse> {
    const body = { token, newPassword };
    return this.http.post<ResetPasswordResponse>(`${this.baseUrl}/reset-password`, body);
  }
  
  forgotPassword(email: string): Observable<ForgotPasswordResponse> {
    return this.http.post<ForgotPasswordResponse>(`${this.baseUrl}/forgot-password`, { email });
  }

  saveToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('auth_token');
  }
}
