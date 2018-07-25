import { CanActivate,
        ActivatedRouteSnapshot,
        RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

// angular will activate this before loading the compent
@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(private authService: AuthService, private router: Router) {}

    // implement this (CanActivate) if you want to protect this route and all of its child routes
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.authService.isAuthenticated().then((authenticated: boolean) => {
            if (authenticated) {
                return true;
            } else {
                this.router.navigate(['/']);
            }
        });
    }

    // implement this (CanActivateChild) if you want to protect child routes
    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.canActivate(childRoute, state);
    }
}
