import { Component, OnInit } from '@angular/core';
import { ChatService } from '../service/chat.service';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

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
  players: any = { player1_name: '', player2_name: '' };

  msgText = new FormControl('', [Validators.required]);

  constructor(private chatService: ChatService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.getUserLocal = localStorage.getItem('userData');
    this.userData = JSON.parse(this.getUserLocal);
    this.onInitCheck();
    this.chatService.getMessage().subscribe((data) => {
      this.chat.push(data);
    });
  }

  onInitCheck() {
    if (this.chat.length === 0) {
      this.chatService.getGame({ mobile: this.userData.mobile }).subscribe((data: any) => {
        this.players = data['results'];
        if (this.players) {
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

  onFileSelected(state: any) {
    this.chatService.openDialog(state, this.room, this.userData.mobile);
  }
}
