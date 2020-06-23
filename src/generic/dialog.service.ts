import { DialogComponent } from './dialog.component';
import { CustomFormConfig } from './form.component';

export class DialogService {
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

  public edit(title: string,formConfig:CustomFormConfig,model:Object){
    return this.dialogRef.edit('update',title, formConfig,model);
  }

  public create(title: string,formConfig:CustomFormConfig){
    return this.dialogRef.edit('create',title, formConfig);
  }
}
