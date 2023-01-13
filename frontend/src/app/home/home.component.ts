import { Component } from '@angular/core';
import {AuthenticationService} from "../service/authentication.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  currentUser$ = this.authService.currentUser;

  constructor(private authService: AuthenticationService, private router: Router) {
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        alert('Logout successful');
        this.router.navigateByUrl('/login');
      }
    })
  }

}
