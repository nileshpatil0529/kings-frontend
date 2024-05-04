import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ChatService } from './chat.service';

@Injectable({
  providedIn: 'root',
})
export class ChatGuard implements CanActivate {
  getUserLocal: any;
  mobile: any;
  gamesData = [];
  constructor(private chatService: ChatService, private router: Router) {
    this.getUserLocal = localStorage.getItem('userData');
    this.mobile = JSON.parse(this.getUserLocal).mobile;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.chatService.getGame({ mobile: this.mobile }).subscribe((data: any) => {
      if (data['results']) {
        data['results'].winer === '' ? this.router.navigate(['/chat']) : '';
      }
    });
    return true;
  }
}
