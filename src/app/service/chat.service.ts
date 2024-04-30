import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from './user.service';
import {MatDialog} from '@angular/material/dialog';
import { GameDialogComponent } from '../partials/game-dialog/game-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  playersPaire: any = {};
  localUser: any;
  userData: any;

  constructor(public dialog: MatDialog, private socket: Socket, private router: Router, private http: HttpClient, private spinner: NgxSpinnerService, private userService: UserService) {}

  sendMessage(msg: any) {
    let message = {
      room: this.playersPaire.room,
      message: msg.message,
      time: msg.time,
      sender: this.playersPaire.sender,
    };
    this.socket.emit('message', message);
  }

  getMessage() {
    return this.socket.fromEvent('message').pipe(map((data: any) => data));
  }

  matchGamer(criteria: any) {
    this.socket.emit('matchCriteria', criteria);
    return this.socket.fromEvent('matchCriteria').subscribe((data: any) => {
      if (data == 2) {
        this.spinner.hide();
        this.userService.openSnackBar('Server Error', 'error');
      } else {
        if (data) {
          this.playersPaire = data;
          this.playersPaire['sender'] = criteria.mobile;
          this.socket.emit('join', this.playersPaire['room']);
          this.router.navigate(['/chat']);
        }
      }
    });
  }

  join(player: any){
    this.playersPaire = player;
    this.socket.emit('join', this.playersPaire['room']);
  }

  getGame(mobile: any) {
    return this.http.post('http://localhost:3000/api/games', mobile);
  }

  chatHistory(file: any) {
    return this.http.post('http://localhost:3000/api/msg-history', file);
  }

  upload(data: any) {
    return this.http.post('http://localhost:3000/api/upload', data);
  }

  getPlayersInfo() {
    return this.playersPaire;
  }

  openDialog(state: any, room: any, sender: any): void {
    this.dialog.open(GameDialogComponent, {
      data: {state: state, room: room, sender: sender},
    });
  }

  closeDialog() {
    this.dialog.closeAll();
  }
}
