import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../service/auth.service';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRoles: string[] = route.data['roles']; // ✅ Perbaikan di sini
    const userRole = this.authService.getRole();
    console.log('User role:', userRole);
    console.log('Expected roles:', expectedRoles);

    if (userRole && expectedRoles.includes(userRole)) {
      return true;
    }
    this.router.navigate(['/no-access']);
    return false;
  }
}
