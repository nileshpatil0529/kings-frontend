import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  userError = '';
  StrongPasswordRegx: RegExp =
    /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/;
  myForm: FormGroup;
  hide = true;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    localStorage.getItem('token') ? router.navigate(['dashboard']) : '';
    this.myForm = this.fb.group({
      mobile: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  login() {
    this.userService.login(this.myForm.value).subscribe(
      (data: any) => {
        localStorage.setItem('token', data['token']);
        localStorage.setItem('userData', JSON.stringify(data['user']));
        this.userService.openSnackBar('User Loggedin Successfully !', 'success')
        this.router.navigate(['/', 'dashboard']);
      },
      (err) => {
        this.userError = err.error.error;
        this.userService.openSnackBar(this.userError+' !', 'error')
      }
    );
  }
}
