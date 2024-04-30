import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ChatService } from 'src/app/service/chat.service';

@Component({
  selector: 'app-game-dialog',
  templateUrl: './game-dialog.component.html',
  styleUrls: ['./game-dialog.component.css'],
})
export class GameDialogComponent {
  selectedFile: File | null = null;

  constructor(public dialogRef: MatDialogRef<GameDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private chatService: ChatService) {}

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
      this.cancel();
      console.log(data);
    });
  }

  cancel() {
    this.chatService.closeDialog();
  }
}
