import { Injectable, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ChatService implements OnInit {
  playersPaire: any = {};
  localUser: any;
  userData: any;
  playersPaireSub = new Subject<number>();

  constructor(private socket: Socket, private router: Router) {}

  ngOnInit(): void {
    this.localUser = localStorage.getItem('userData');
    this.userData = JSON.parse(this.userData);
  }

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
      if (data) {
        this.playersPaire = data;
        this.playersPaire['sender'] = criteria.mobile;
        this.socket.emit('join', this.playersPaire['room']);
        this.playersPaireSub.next(this.playersPaire);
        this.router.navigate(['/chat']);
      }
    });
  }

  getPlayersInfo() {
    return this.playersPaire;
  }

  getGameStart() {
    return this.playersPaireSub;
  }
}
