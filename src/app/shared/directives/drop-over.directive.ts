import { Directive, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[appDropOver]'
})
export class DropOverDirective {

  @Input() appFileDropOver: boolean = true;
  @Output() fileDropped = new EventEmitter<any>();
  @HostBinding('style.background-color') private background = '#ffffff';

  @HostListener('dragover', ['$event']) dragOver(event: any) {
    if (!this.appFileDropOver) { return; };
    event.preventDefault();
    event.stopPropagation();
    this.background = '#e2eefd';
  }

  @HostListener('dragleave', ['$event']) public dragLeave(event: any) {
    if (!this.appFileDropOver) { return; };
    event.preventDefault();
    event.stopPropagation();
    this.background = '#ffffff';
  }

  @HostListener('drop', ['$event']) public drop(event: any) {
    if (!this.appFileDropOver) { return; };
    event.preventDefault();
    event.stopPropagation();
    this.background = '#ffffff';
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      this.fileDropped.emit(files);
    }
  }

}
