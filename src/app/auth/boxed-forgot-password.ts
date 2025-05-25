import { Component, OnDestroy } from '@angular/core'; 
import { toggleAnimation } from 'src/app/shared/animations'; // Pastikan digunakan di HTML
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { AppService } from 'src/app/service/app.service';
import { AuthService } from 'src/app/service/auth.service';
import { finalize } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './boxed-forgot-password.html',
  animations: [toggleAnimation], // Hapus jika tidak digunakan di template
})
export class BoxedForgotPasswordComponent implements OnDestroy {
  email: string = '';
  loading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';
  store: any;

  private storeSub?: Subscription;

  constructor(
    public translate: TranslateService,
    public storeData: Store<any>,
    public router: Router,
    private appSetting: AppService,
    private authService: AuthService
  ) {
    this.initStore();
  }

  initStore() {
    this.storeSub = this.storeData.select(d => d.index).subscribe(d => {
      this.store = d;
    });
  }

  onForgotPassword() {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.email.trim()) {
      this.errorMessage = 'Email wajib diisi.';
      return;
    }

    this.loading = true;

    this.authService
      .forgotPassword(this.email.trim())
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (res: any) => {
          // Backend sudah kirim objek JSON { message: "..."} sesuai perbaikan backend
          if (res && res.message) {
            this.successMessage = res.message;
          } else if (typeof res === 'string') {
            this.successMessage = res;
          } else {
            this.successMessage = 'Jika email terdaftar, link reset telah dikirim.';
          }
        },
        error: (err: any) => {
          if (err?.error) {
            if (typeof err.error === 'string') {
              this.errorMessage = err.error;
            } else if (err.error.message) {
              this.errorMessage = err.error.message;
            } else {
              this.errorMessage = JSON.stringify(err.error);
            }
          } else {
            this.errorMessage = 'Terjadi kesalahan saat mengirim link reset.';
          }
        },
      });
  }

  ngOnDestroy() {
    this.storeSub?.unsubscribe();
  }
}
