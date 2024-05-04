import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ChatService } from 'src/app/service/chat.service';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-dialog',
  templateUrl: './game-dialog.component.html',
  styleUrls: ['./game-dialog.component.css'],
})
export class GameDialogComponent {
  selectedFile: File | null = null;

  constructor(public dialogRef: MatDialogRef<GameDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private chatService: ChatService, private userService: UserService, private router: Router) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onFileUpload() {
    const formData = new FormData();

    if (!this.selectedFile) {
      console.error('No file selected');
      return;
    }
    formData.append('file', this.selectedFile);
    formData.append('state', this.data.state);
    formData.append('room', this.data.room);
    formData.append('sender', this.data.sender);
    this.chatService.upload(formData).subscribe((data: any) => {
      this.chatService.gameStatus({ room: this.data.room, stat: { status: this.data.state, sender: this.data.sender } });
      this.cancel();
      this.router.navigate(['/dashboard/games']);
      this.userService.openSnackBar(data.message, 'success');
    });
  }

  updateGameStatus() {
    console.log(this.data.room);

    this.chatService.updateGameStat({ room: this.data.room }).subscribe((data: any) => {
      this.chatService.gameStatus({ room: this.data.room, stat: { status: this.data.state, sender: this.data.sender } });
      this.cancel();
      this.router.navigate(['/dashboard/games']);
      this.userService.openSnackBar(data.message, 'success');
    });
  }

  cancel() {
    this.chatService.closeDialog();
  }
}
