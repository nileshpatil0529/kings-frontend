import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { SnakbarComponent } from '../partials/snakbar/snakbar.component';


@Injectable({
  providedIn: 'root',
})
export class UserService {

  isLoggedIn = new BehaviorSubject<boolean>(false)

  constructor(private http: HttpClient, private router: Router, private _snackBar: MatSnackBar) {}

  login(user: any) {
    return this.http.post('http://localhost:3000/api/login', user)
  }

  register(user: any) {
    return this.http.post('http://localhost:3000/api/register', user)
  }

  addGame(data: any) {
    return this.http.post('http://localhost:3000/api/games', data)
  }

  openSnackBar(message: string, customClass: string) {
    this._snackBar.openFromComponent(SnakbarComponent, {
      data: { message, customClass },
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 5 * 1000,
    });
  }
}
