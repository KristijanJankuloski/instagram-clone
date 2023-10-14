import { MatSnackBarConfig } from '@angular/material/snack-bar'

export const snackBarError: MatSnackBarConfig = {
    duration: 5000,
    verticalPosition: 'top',
    horizontalPosition: 'end',
    panelClass: ['snack-bar-error']
}

export const snackBarInfo: MatSnackBarConfig = {
    duration: 5000,
    verticalPosition: 'top',
    horizontalPosition: 'end',
}