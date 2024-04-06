import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  getUserLocal: any;
  userData: any;

  ngOnInit(): void {
    this.getUserLocal = localStorage.getItem('userData');
    this.userData = JSON.parse(this.getUserLocal);
  }

  navLinks = [
    { path: 'games', label: 'Games' },
    { path: 'history', label: 'History' },
    { path: 'account', label: 'Account' },
  ];
}
