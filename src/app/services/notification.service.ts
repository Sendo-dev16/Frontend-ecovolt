import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private snackBar: MatSnackBar) { }

  success(message: string, title = 'Operacion exitosa'): void {
    this.open(title + ': ' + message, 'success-snackbar');
  }

  error(message: string, title = 'Error'): void {
    this.open(title + ': ' + message, 'error-snackbar');
  }

  confirm(message: string): boolean {
    return window.confirm(message);
  }

  private open(message: string, panelClass: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 4200,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass
    });
  }
}

