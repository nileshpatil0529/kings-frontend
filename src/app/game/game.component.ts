import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ChatService } from '../service/chat.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  balance: number;
  options: string[] = ['10', '20', '30', '50', '70', '100', '150', '200', '250', '300', '400', '500', '700', '1000'];
  amount = new FormControl([], [Validators.required]);
  getUserLocal: any;
  userData: any;
  isGameStart = false;

  constructor(private chatService: ChatService, private spinner: NgxSpinnerService) {
    this.getUserLocal = localStorage.getItem('userData');
    this.userData = JSON.parse(this.getUserLocal);
    this.balance = +this.userData.balance;
  }
  ngOnInit(): void {
    this.spinner.hide();
  }

  onSumit(data: any) {
    this.spinner.show();
    let param = {
      mobile: this.userData.mobile,
      user: this.userData.username,
      amount: this.amount.value,
      game: data,
    };
    this.chatService.matchGamer(param);
  }
}
