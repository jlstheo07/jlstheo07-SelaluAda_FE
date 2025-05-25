import { Component, OnDestroy, OnInit } from '@angular/core';
import { toggleAnimation } from 'src/app/shared/animations';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { AppService } from 'src/app/service/app.service';
import { AuthService } from 'src/app/service/auth.service';
import { finalize } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './boxed-password-reset.html',
  animations: [toggleAnimation],
})
export class BoxedPasswordResetComponent implements OnInit, OnDestroy {
  token: string = '';
  newPassword: string = '';
  loading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';
  store: any;

  private storeSub?: Subscription;
  private routeSub?: Subscription;

  constructor(
    public translate: TranslateService,
    public storeData: Store<any>,
    public router: Router,
    private route: ActivatedRoute,
    private appSetting: AppService,
    private authService: AuthService
  ) {
    this.initStore();
  }

  ngOnInit() {
    // Ambil token dari query params otomatis saat komponen di-init
    this.routeSub = this.route.queryParams.subscribe(params => {
      this.token = params['token'] || '';
    });
  }

  initStore() {
    this.storeSub = this.storeData.select(d => d.index).subscribe(d => {
      this.store = d;
    });
  }

  changeLanguage(item: any) {
    this.translate.use(item.code);
    this.appSetting.toggleLanguage(item);
    const locale = this.store?.locale?.toLowerCase() || '';
    if (locale === 'ae') {
      this.storeData.dispatch({ type: 'toggleRTL', payload: 'rtl' });
    } else {
      this.storeData.dispatch({ type: 'toggleRTL', payload: 'ltr' });
    }
    window.location.reload();
  }

  onResetPassword() {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.token.trim()) {
      this.errorMessage = 'Token reset password tidak ditemukan.';
      return;
    }
    if (!this.newPassword.trim()) {
      this.errorMessage = 'Password baru wajib diisi.';
      return;
    }

    this.loading = true;

    this.authService
      .resetPassword(this.token.trim(), this.newPassword.trim())
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: () => {
          this.successMessage = 'Password berhasil direset. Silakan login.';
          setTimeout(() => this.router.navigate(['/login']), 3000);
        },
        error: (err) => {
          this.errorMessage =
            err?.error?.message ||
            err?.error ||
            'Terjadi kesalahan saat mereset password. Periksa token atau coba lagi.';
        },
      });
  }

  ngOnDestroy() {
    this.storeSub?.unsubscribe();
    this.routeSub?.unsubscribe();
  }
}
