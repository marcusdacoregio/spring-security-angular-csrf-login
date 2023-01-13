import {Injectable} from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    CanActivateChild,
    Router,
    RouterStateSnapshot,
    UrlTree,
} from '@angular/router';
import {Observable} from 'rxjs';

import {filter, map, take} from 'rxjs/operators';
import {AuthenticationService} from "../service/authentication.service";

@Injectable({
    providedIn: 'root',
})
export class IsAuthenticatedGuard implements CanActivate, CanActivateChild {
    constructor(private router: Router, private authenticationService: AuthenticationService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.authenticationService.isAuthenticated.pipe(
            filter((value) => value !== null),
            take(1),
            map((isAuthenticated) => {
                if (isAuthenticated) {
                    return true;
                }
                this.router.navigateByUrl('/login');
                return false;
            })
        );
    }

    canActivateChild(
        childRoute: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.canActivate(childRoute, state);
    }
}
