import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  navLinks = [
    { path: 'games', label: 'Games' },
    { path: 'history', label: 'History' },
    { path: 'account', label: 'Account' },
  ];

}
