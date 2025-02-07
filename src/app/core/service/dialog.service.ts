import { ComponentType } from '@angular/cdk/overlay';
import { inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

enum Dialogs {
  SHIFT = 'edit-shift-dialog',
}

interface DialogData {
  [Dialogs.SHIFT]: { config: any; id: string };
}
type DialogConfig<T> = MatDialogConfig<T>;

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private readonly dialog = inject(MatDialog);

  open<T extends keyof DialogData>(component: ComponentType<unknown>, config: DialogConfig<DialogData[T]> = {}) {
    const _config: DialogConfig<DialogData[T]> = {
      width: '700px',
      maxWidth: '100vw',
      maxHeight: '100vh',
      restoreFocus: true,
      ...config,
    };
    return this.dialog.open(component, _config);
  }
}
