import { DialogComponent } from './dialog.component';
import { DialogType } from './generic.classes';

export class DialogService {
  public registerComponent(dialog: DialogComponent) {
    this.dialogRef = dialog;
  }
  private dialogRef: DialogComponent;

  public show(dialogType: DialogType, config: Object) {
    return this.dialogRef.show(dialogType, config);
  }
}

export class MessageBoxService {
  public registerComponent(dialog: DialogComponent) {
    this.dialogRef = dialog;
  }
  private dialogRef: DialogComponent;

  public delete(title: string, description: string) {
    return this.dialogRef.showText('delete', title, description);
  }

  public confirm(title: string, description: string) {
    return this.dialogRef.showText('confirm', title, description);
  }

  public warning(title: string, description: string) {
    return this.dialogRef.showText('warning', title, description);
  }

  public error(title: string, description: string) {
    return this.dialogRef.showText('error', title, description);
  }
}
