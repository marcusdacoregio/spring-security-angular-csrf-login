import {Injectable} from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    CanActivateChild,
    CanLoad,
    CanMatch,
    Route,
    Router,
    RouterStateSnapshot,
    UrlSegment,
    UrlTree
} from '@angular/router';
import {Observable} from 'rxjs';

import {filter, map, take} from 'rxjs/operators';

import {AuthenticationService} from '../service/authentication.service';

@Injectable({
    providedIn: 'root',
})
export class AutoLoginGuard implements CanActivate, CanActivateChild {

    constructor(private router: Router, private authenticationService: AuthenticationService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.authenticationService.isAuthenticated.pipe(
            filter((value) => value !== null),
            take(1),
            map((isAuthenticated) => {
                if (isAuthenticated) {
                    this.router.navigateByUrl('/home', {replaceUrl: true});
                    return false;
                } else {
                    return true;
                }
            })
        );
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.canActivate(childRoute, state);
    }

}
