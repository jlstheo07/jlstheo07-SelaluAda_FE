import { Component } from '@angular/core';
import { toggleAnimation } from 'src/app/shared/animations';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { AppService } from 'src/app/service/app.service';
import { AuthService } from '../service/auth.service';

@Component({
    templateUrl: './boxed-signin.html',
    animations: [toggleAnimation],
})
export class BoxedSigninComponent {
    store: any;
    username: string = '';
    password: string = '';
    errorMessage: string = '';

    constructor(
        public translate: TranslateService,
        public storeData: Store<any>,
        public router: Router,
        private appSetting: AppService,
        private authService: AuthService,        
    ) {
        this.initStore();
    }
    async initStore() {
        this.storeData
            .select((d) => d.index)
            .subscribe((d) => {
                this.store = d;
            });
    }

    changeLanguage(item: any) {
        this.translate.use(item.code);
        this.appSetting.toggleLanguage(item);
        if (this.store.locale?.toLowerCase() === 'ae') {
            this.storeData.dispatch({ type: 'toggleRTL', payload: 'rtl' });
        } else {
            this.storeData.dispatch({ type: 'toggleRTL', payload: 'ltr' });
        }
        window.location.reload();
    }
    
    onLogin(): void {
        console.log("Masuk on Login")
        this.authService.login(this.username, this.password).subscribe({
          next: (res) => {
            console.log(res);
            console.log("Masuk on res")
            this.authService.saveToken(res.token);
            this.router.navigate(['/']); // arahkan ke halaman setelah login
          },
          error: (err) => {
            console.log("Masuk on error")
            this.errorMessage = 'Username atau password salah';
          }
        });
    }
}
