import { Injectable, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ChatService implements OnInit {
  playersPaire: any = {};
  localUser: any;
  userData: any;

  constructor(private socket: Socket) {}

  ngOnInit(): void {
    this.localUser = localStorage.getItem('userData');
    this.userData = JSON.parse(this.userData);
  }

  sendMessage(msg: any) {
    this.playersPaire['message'] = {
      message: msg.message,
      time: msg.time,
      you:  this.playersPaire.you,
      sender: this.playersPaire.sender
    }
    this.socket.emit('message', this.playersPaire);
  }

  getMessage() {
    return this.socket.fromEvent('message').pipe(map((data: any) => data));
  }

  matchGamer(criteria: any) {
    this.socket.emit('matchCriteria', criteria);
    return this.socket.fromEvent('matchCriteria').subscribe((data: any) => {
      if (data) {
        this.playersPaire = {
          room: data.opponent.mobile + data.you.mobile,
          opponent: data.opponent.mobile,
          opponent_name: data.opponent.user,
          you: data.you.mobile,
          you_name: data.you.user,
          amount: data.opponent.amount,
          game: data.opponent.game,
          sender: criteria.mobile
        };
        this.socket.emit('join', this.playersPaire['room']);
      }
    });
  }
}
