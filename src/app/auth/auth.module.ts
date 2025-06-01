import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

// shared module
import { SharedModule } from 'src/shared.module';

import { BoxedLockscreenComponent } from './boxed-lockscreen';
import { BoxedPasswordResetComponent } from './boxed-password-reset';
import { BoxedSigninComponent } from './boxed-signin';
import { BoxedSignupComponent } from './boxed-signup';
import { BoxedChangePasswordComponent } from './boxed-change-password';
import { BoxedForgotPasswordComponent } from './boxed-forgot-password';
import { LandingComponent } from './landing';
import { title } from 'process';



const routes: Routes = [
    { path: 'auth/boxed-lockscreen', component: BoxedLockscreenComponent, data: { title: 'Boxed Lockscreen' } },
    { path: 'auth/boxed-password-reset',  component: BoxedPasswordResetComponent, data: { title: 'Boxed Password Reset' },},
    { path: 'auth/boxed-signin', component: BoxedSigninComponent, data: { title: 'Boxed Signin' } },
    { path: 'auth/boxed-signup', component: BoxedSignupComponent, data: { title: 'Boxed Signup' } },
    { path: 'auth/boxed-change-password', component: BoxedChangePasswordComponent, data: { title: 'Boxed Change Password' } },
    { path: 'auth/boxed-forgot-password', component: BoxedForgotPasswordComponent, data: { title: 'Boxed Forgot Password' } },
    { path: 'auth/landing', component: LandingComponent, data: {title: 'Landing'} },

   
];
@NgModule({
    imports: [RouterModule.forChild(routes), CommonModule, SharedModule.forRoot()],
    declarations: [
        BoxedLockscreenComponent,
        BoxedPasswordResetComponent,
        BoxedSigninComponent,
        BoxedSignupComponent,
        BoxedChangePasswordComponent,
        BoxedForgotPasswordComponent,
        LandingComponent
    ],
})
export class AuthModule {}
