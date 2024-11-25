import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, throwError } from 'rxjs';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const snackBar = inject(MatSnackBar);

  return next(req).pipe(
    catchError((error) => {
      if (error.status === 400 || error.status === 500) {
        const message = error.error.message || 'Une erreur inattendue s\'est produite';
        snackBar.open(message, 'Fermer', { duration: 5000, panelClass: ['snackbar-error'] });
      }
      return throwError(() => error);
    })
  );
};
