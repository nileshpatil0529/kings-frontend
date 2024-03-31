import { Component, OnInit } from '@angular/core';
import { ChatService } from '../service/chat.service';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

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

  msgText = new FormControl('', [Validators.required]);

  constructor(
    private chatService: ChatService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getUserLocal = localStorage.getItem('userData');
    this.userData = JSON.parse(this.getUserLocal);

    this.route.params.subscribe((criteria) => {
      this.chatService.matchGamer(criteria);
    });

    this.chatService.getMessage().subscribe((data) => {
      this.chat.push(data.message);
    });
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
      mobile: this.userData.mobile
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

  onFileSelected() {
    const inputNode: any = document.querySelector('#file');
    if (typeof FileReader !== 'undefined') {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        let srcResult = e.target.result;
      };
      reader.readAsArrayBuffer(inputNode.files[0]);
    }
  }
}
