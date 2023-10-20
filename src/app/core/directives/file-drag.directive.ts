import { Directive, EventEmitter, HostBinding, HostListener, Output, inject } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

export interface FileHandle {
  file: File;
  url: SafeUrl;
}

@Directive({
  selector: '[appFileDrag]',
  standalone: true
})
export class FileDragDirective {
  private sanitizer = inject(DomSanitizer);
  
  @Output() fileEvent: EventEmitter<FileHandle> = new EventEmitter();

  @HostBinding("class.is-dragged-over") private dragOverClass = false;

  @HostListener("dragover", ["$event"])
  onDragOver(event: DragEvent){
    event.preventDefault();
    event.stopPropagation();
    this.dragOverClass = true;
  }

  @HostListener("dragleave", ["$event"])
  onDragLeave(event: DragEvent){
    event.preventDefault();
    event.stopPropagation();
    this.dragOverClass = false;
  }

  @HostListener("drop", ["$event"])
  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    let file = event.dataTransfer.files[0];
    let fileHandle: FileHandle = {
      file,
      url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file))
    }
    this.fileEvent.emit(fileHandle);
    this.dragOverClass = false;
  }
}
