import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './app/auth/login/login.component';
import { RegisterComponent } from './app/auth/register/register.component';
import { DashboardComponent } from './app/dashboard/dashboard.component';
import { GameComponent } from './app/game/game.component';
import { ChatComponent } from './app/chat/chat.component';
import { HistoryComponent } from './app/history/history.component';
import { AccountComponent } from './app/account/account.component';
import { AuthGuardGuard } from './app/service/auth-guard.guard';

const routes: Routes = [
  // {path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'chat', canActivate: [AuthGuardGuard], component: ChatComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'games', pathMatch: 'full' },
      { path: 'games', canActivate: [AuthGuardGuard], component: GameComponent },
      { path: 'history', canActivate: [AuthGuardGuard], component: HistoryComponent },
      { path: 'account', canActivate: [AuthGuardGuard], component: AccountComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
