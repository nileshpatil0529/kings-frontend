import { Component, OnInit } from '@angular/core';
import { ChatService } from '../service/chat.service';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { GameDialogComponent } from '../partials/game-dialog/game-dialog.component';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  mySelf = 'chat-message-right pb-4';
  him = 'chat-message-left pb-4';
  chat: any = [];
  getUserLocal: any;
  userData: any;
  room: any;
  winer: any;
  private audio!: HTMLAudioElement;
  reporter: any;
  players: any = { player1_name: '', player2_name: '' };

  msgText = new FormControl('', [Validators.required]);

  constructor(public dialog: MatDialog, private chatService: ChatService, private route: ActivatedRoute, private router: Router) {
    this.audio = new Audio();
    this.audio.src = '../../assets/tune/ludo.wav';
  }

  ngOnInit(): void {
    this.getUserLocal = localStorage.getItem('userData');
    this.userData = JSON.parse(this.getUserLocal);
    this.onInitCheck();
    this.chatService.getGameStatus().subscribe((data) => {
      if (data.stat.status === 'win') {
        this.audio.play();
        this.reporter = '';
        this.winer = data.stat.sender.toString();
      } else {
        this.winer = '';
        this.reporter = data.stat.sender.toString();
      }
      this.check();
    });
    this.chatService.getMessage().subscribe((data) => {
      this.chat.push(data);
    });
  }

  onInitCheck() {
    if (this.chat.length === 0) {
      this.chatService.getGame({ mobile: this.userData.mobile }).subscribe((data: any) => {
        if (data['results']) {
          this.players = data['results'];
          this.winer = this.players.winer;
          this.reporter = this.players.reporter;
          this.check();
          this.players['sender'] = this.userData.mobile;
          this.room = this.players['room'];
          this.chatService.join(this.players);
          this.chatService.chatHistory({ file: this.players.room }).subscribe((data: any) => {
            this.chat = data;
          });
        } else {
          this.router.navigate(['/dashboard']);
        }
      });
    }
  }

  check() {
    if (this.winer === this.userData.mobile.toString() || this.winer == '') {
      this.chatService.closeDialog();
    } else if (this.reporter === this.userData.mobile.toString()) {
      this.chatService.closeDialog();
    } else {
      this.onSubmit('report');
    }
  }

  chatFun() {
    const currentISTTime = new Date().toLocaleTimeString('en-IN', {
      timeZone: 'Asia/Kolkata',
      hour12: true,
    });
    const data = {
      time: currentISTTime,
      user: this.userData.username,
      message: this.msgText.value,
      mobile: this.userData.mobile,
    };
    this.msgText.setValue('');
    this.chatService.sendMessage(data);
  }

  checkLink(msg: string) {
    const text = msg;
    const regex = /\b\d{8}\b/g;
    const eightDigitNumbers = text.match(regex);
    return eightDigitNumbers ? +eightDigitNumbers : msg;
  }
  type(msg: any) {
    return typeof msg === 'number' ? true : false;
  }

  onSubmit(state: any) {
    console.log(this.players);

    this.dialog.open(GameDialogComponent, {
      disableClose: true,
      data: { state: state, room: this.players.room, sender: this.userData.mobile },
    });
  }
}
