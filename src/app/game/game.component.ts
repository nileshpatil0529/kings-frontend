import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ChatService } from '../service/chat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent {
  balance: number = 50;
  options: string[] = [
    '00',
    '10',
    '20',
    '30',
    '50',
    '70',
    '100',
    '150',
    '200',
    '250',
    '300',
    '400',
    '500',
    '700',
    '1000',
  ];
  amount = new FormControl(this.options[0], [Validators.required]);
  getUserLocal: any;
  userData: any;

  constructor(private chatService: ChatService, private router: Router) {
    this.getUserLocal = localStorage.getItem('userData');
    this.userData = JSON.parse(this.getUserLocal);
  }

  onSumit(data: any) {
    let param = {
      mobile: this.userData.mobile,
      user: this.userData.username,
      amount: this.amount.value,
      game: data,
    };
    this.router.navigate(['/chat', param]);
  }
}
