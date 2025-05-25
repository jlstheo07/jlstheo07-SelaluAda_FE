import { Component } from '@angular/core';
import { toggleAnimation } from 'src/app/shared/animations';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { AppService } from 'src/app/service/app.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
    templateUrl: './boxed-change-password.html',
    animations: [toggleAnimation],
})
export class BoxedChangePasswordComponent {
    oldPassword: string = '';
    newPassword: string = '';
    confirmPassword: string = '';

    showOldPassword: boolean = false;
    showNewPassword: boolean = false;
    showConfirmPassword: boolean = false;

    message: string = '';
    error: string = '';

    store: any;

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
        this.storeData
            .select((d) => d.index)
            .subscribe((d) => {
                this.store = d;
            });
    }

    changeLanguage(item: any) {
        this.translate.use(item.code);
        this.appSetting.toggleLanguage(item);

        const direction = this.store?.locale?.toLowerCase() === 'ae' ? 'rtl' : 'ltr';
        this.storeData.dispatch({ type: 'toggleRTL', payload: direction });

        window.location.reload();
    }

    toggleShowPassword(field: 'old' | 'new' | 'confirm') {
        if (field === 'old') this.showOldPassword = !this.showOldPassword;
        else if (field === 'new') this.showNewPassword = !this.showNewPassword;
        else if (field === 'confirm') this.showConfirmPassword = !this.showConfirmPassword;
    }

    onChangePassword() {
        this.message = '';
        this.error = '';

        if (!this.oldPassword || !this.newPassword || !this.confirmPassword) {
            this.error = 'Semua field harus diisi.';
            return;
        }

        if (this.newPassword !== this.confirmPassword) {
            this.error = 'Password baru dan konfirmasi tidak cocok.';
            return;
        }

        this.authService.changePassword(this.oldPassword, this.newPassword).subscribe({
            next: (res) => {
                if (res.status === 200 || res.status === 204) {
                    this.message = 'Password berhasil diubah.';
                    this.oldPassword = '';
                    this.newPassword = '';
                    this.confirmPassword = '';
                } else {
                    this.error = 'Password berhasil diubah, tapi status tidak dikenali.';
                }
            },
            error: (err) => {
                this.error = err.error?.message || 'Gagal mengubah password.';
            }
        });
    }
}
