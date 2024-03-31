import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import {
  passwordValidator,
  emailOrObileExist,
} from 'src/helper/passwordValidator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnakbarComponent } from 'src/app/partials/snakbar/snakbar.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  myForm: FormGroup;
  hide = true;
  hidep = true;
  StrongPasswordRegx: RegExp =
    /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/;
  durationInSeconds = 5;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {
    localStorage.getItem('token') ? router.navigate(['dashboard']) : '';
    this.myForm = this.fb.group(
      {
        username: ['', [Validators.required, Validators.maxLength(10)]],
        mobile: [
          '',
          {
            validators: [
              Validators.required,
              Validators.minLength(10),
              Validators.maxLength(10),
              Validators.pattern('^[0-9]*$'),
            ],
            asyncValidators: [emailOrObileExist()],
          },
        ],
        password: [
          '',
          [Validators.required, Validators.pattern(this.StrongPasswordRegx)],
        ],
        confirmPasswordControl: ['', [Validators.required]],
      },
      { validator: passwordValidator.bind(this) }
    );
  }

  onClick() {
    this.userService.register(this.myForm.value).subscribe(
      (data: any) => {
        this.userService.openSnackBar(data.message, 'success');
        this.router.navigate(['login']);
      },
      (err: any) => {
        this.userService.openSnackBar(err.error, 'error');
      }
    );
  }
}
