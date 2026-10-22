import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  showNotification(message: string, type: 'error' | 'warning' | 'success' = 'success') {
    const panelClass = this.getPanelClass(type);
    this.snackBar.open(message, 'Close', {
      duration: 4000,
      panelClass: panelClass,
      verticalPosition: 'top',  // Position at the top
      horizontalPosition: 'right' // Position at the right
    });
  }

  private getPanelClass(type: string): string {
    switch (type) {
      case 'error':
        return 'snack-error';
      case 'warning':
        return 'snack-warning';
      case 'success':
        return 'snack-success';
      default:
        return '';
    }
  }
}
