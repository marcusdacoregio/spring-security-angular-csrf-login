import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../service/authentication.service";
import {Router} from "@angular/router";

interface LoginForm {
  username: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm = new FormGroup<LoginForm>({
    username: this.fb.nonNullable.control('user', Validators.required),
    password: this.fb.nonNullable.control('password', Validators.required),
  });

  constructor(private authService: AuthenticationService, private fb: FormBuilder, private router: Router) {
  }

  login(): void {
    if (!this.loginForm.valid) {
      alert('The login form is invalid');
      return;
    }

    this.authService.login(this.loginForm.value.username!, this.loginForm.value.password!)
        .subscribe({
          next: () => {
            alert('Login successful');
            this.router.navigateByUrl('/home');
          },
          error: (err) => {
            console.error(err);
            alert('Login failed, check the console log for details');
          }
        });
  }

}
