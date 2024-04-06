import { Component, Inject, inject } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snakbar',
  templateUrl: './snakbar.component.html',
  styleUrls: ['./snakbar.component.css'],
})
export class SnakbarComponent {
  snackBarRef = inject(MatSnackBarRef);
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {}
}
