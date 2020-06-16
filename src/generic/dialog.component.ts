import { Component, Output, AfterViewInit } from '@angular/core';
import { DialogService, MessageBoxService } from './dialog.service';
import { DialogType } from './generic.classes';
import { Subject } from 'rxjs';

@Component({
  selector: 'generic-dialog',
  templateUrl: 'dialog.component.html',
  styles: [
    `
      .backdrop {
        width: 100vw;
        height: 100vh;
      }

      .modal {
        transition: opacity 0.25s ease;
      }
      DialogService.modal-active {
        overflow-x: hidden;
        overflow-y: visible !important;
      }
    `,
  ],
})
export class DialogComponent implements AfterViewInit {
  constructor(
    private dialogService: DialogService,
    private messageBoxService: MessageBoxService
  ) {
    this.dialogService.registerComponent(this);
    this.messageBoxService.registerComponent(this);
  }

  ngAfterViewInit() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  title: string;
  description: string;
  visible = false;
  config: {
    type: DialogType;
    showCancelButton: boolean;
    confirmButtonText: string;
    confirmButtonColor: string;
  };

  public show(type: DialogType, config: Object) {
    this.fillConfig(type);
    if (config) {
    }
    this.toggleModal();
  }
  sub: Subject<any>;
  public showText(type: DialogType, title: string, description: string) {
    this.fillConfig(type);
    this.title = title;
    this.description = description;
    this.sub = new Subject();
    this.toggleModal();
    return this.sub;
  }

  private fillConfig(type: DialogType) {
    this.config = {} as any;
    this.config.type = type;
    this.config.showCancelButton = this.showCancelButton();
    this.config.confirmButtonText = this.confirmButtonText();
    this.config.confirmButtonColor = this.confirmButtonColor();
  }

  private showCancelButton() {
    if (!this.config.type) return;
    return (
      this.config.type === 'create' ||
      this.config.type === 'delete' ||
      this.config.type === 'update' ||
      this.config.type === 'confirm'
    );
  }

  private confirmButtonText() {
    if (!this.config.type) return;
    switch (this.config.type) {
      case 'create':
        return 'Erstellen';
      case 'update':
        return 'Updaten';
      case 'delete':
        return 'Löschen';
      case 'confirm':
      case 'warning':
      case 'error':
        return 'OK';
    }
  }

  private confirmButtonColor() {
    if (!this.config.type) return;
    switch (this.config.type) {
      case 'create':
        return 'bg-indigo-400 hover:bg-indigo-500';
      case 'update':
        return 'bg-green-500 hover:bg-green-600';
      case 'delete':
        return 'bg-red-600 hover:bg-red-700';
      case 'confirm':
        return 'bg-gray-400 hover:bg-gray-500';
      case 'warning':
        return 'bg-yellow-400 hover:bg-yellow-500';
      case 'error':
        return 'bg-gray-400 hover:bg-gray-500';
      default:
        throw 'backgroundColor:not implemented';
    }
  }

  confirmed() {
    this.sub.next('JA');
    this.toggleModal();
  }

  cancel() {
    this.toggleModal();
  }

  //   var openmodal = document.querySelectorAll('.modal-open')
  // for (var i = 0; i < openmodal.length; i++) {
  //   openmodal[i].addEventListener('click', function(event){
  // 	event.preventDefault()
  // 	toggleModal()
  //   })
  // }

  // const overlay = document.querySelector('.modal-overlay')
  // overlay.addEventListener('click', toggleModal)

  // var closemodal = document.querySelectorAll('.modal-close')
  // for (var i = 0; i < closemodal.length; i++) {
  //   closemodal[i].addEventListener('click', toggleModal)
  // }

  // document.onkeydown = function(evt) {
  //   evt = evt || window.event
  //   var isEscape = false
  //   if ("key" in evt) {
  // 	isEscape = (evt.key === "Escape" || evt.key === "Esc")
  //   } else {
  // 	isEscape = (evt.keyCode === 27)
  //   }
  //   if (isEscape && document.body.classList.contains('modal-active')) {
  // 	toggleModal()
  //   }
  // };

  toggleModal() {
    this.visible = !this.visible;
  }

  onKey(value) {
    debugger;
    // this.toggleModal();
  }
}
