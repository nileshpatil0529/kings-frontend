import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnakbarComponent } from '../partials/snakbar/snakbar.component';


@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) {}

  login(user: any) {
    return this.http.post('http://localhost:3000/api/login', user)
  }

  register(user: any) {
    return this.http.post('http://localhost:3000/api/register', user)
  }

  addGame(data: any) {
    return this.http.post('http://localhost:3000/api/games', data)
  }

  cancelBet(mobile: any) {
    return this.http.post('http://localhost:3000/api/cancel-bet', mobile)
  }

  checkExist(mobile: any) {
    return this.http.post('http://localhost:3000/api/check-exist', mobile)
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
