import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {BehaviorSubject, Observable, switchMap, tap} from "rxjs";

@Injectable({providedIn: 'root'})
export class AuthenticationService {

    private isAuthenticatedSubject = new BehaviorSubject<boolean | null>(null);
    private currentUserSubject = new BehaviorSubject<any | null>(null);

    constructor(private http: HttpClient) {
    }

    checkAuthentication(): Observable<void> {
        return this.me();
    }

    me(): Observable<any> {
        return this.http.get<any>('/user/me').pipe(
            tap({
                next: (user) => {
                    this.isAuthenticatedSubject.next(true);
                    this.currentUserSubject.next(user);
                },
                error: () => {
                    this.isAuthenticatedSubject.next(false);
                    this.currentUserSubject.next(null);
                }
            })
        )
    }

    login(username: string, password: string): Observable<any> {
        const params = new HttpParams().set('username', username).set('password', password);
        const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this.http.post<void>('/login', params, { headers }).pipe(
            switchMap(() => this.me())
        );
    }

    logout(): Observable<void> {
        return this.http.post<void>('/logout', {}).pipe(
            tap({
                next: () => this.isAuthenticatedSubject.next(false)
            })
        );
    }

    get isAuthenticated(): Observable<boolean | null> {
        return this.isAuthenticatedSubject.asObservable();
    }

    get currentUser(): Observable<any | null> {
        return this.currentUserSubject.asObservable();
    }

}
