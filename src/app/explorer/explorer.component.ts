import { Component, OnInit } from '@angular/core';
import { EditorFile, FileService } from '../file/file.service';

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.scss'],
})
export class ExplorerComponent implements OnInit {
  // @ViewChild('newFile') newFile?: ElementRef;

  public root: EditorFile = {name: '/', type: 'directory', children: []}
  public addFile = false;

  constructor(private fileService: FileService) {
  }

  ngOnInit(): void {
    this.fileService.subscribe(
      files => {
        this.setFiles(files);
      },
      err => console.error(err),
    );
  }

  public setFiles(files: EditorFile[]) {
    console.log(files);
    this.root.children = files;
  }

  public select(file: EditorFile): void {
    console.log('select', file);
    this.fileService.select(file);
  }

  /*
   public add($event: KeyboardEvent): void {
   switch ($event.key) {
   case 'Enter':
   this.saveAddFile();
   break;
   case 'Escape':
   this.hideAddFile();
   break;
   }
   }


   public showAddFile(): void {
   this.addFile = true;
   timer(50).subscribe(_ => {
   if (this.newFile?.nativeElement) {
   this.newFile.nativeElement.focus();
   }
   });
   }
   public hideAddFile(): void {
   if (this.newFile?.nativeElement) {
   this.newFile.nativeElement.value = undefined;
   }
   this.addFile = false;
   }
   public saveAddFile(): void {
   if (this.newFile?.nativeElement) {
   let fileName = this.newFile.nativeElement.value;
   if (fileName === '') {
   alert('pleaser enter filename');
   return;
   }
   let file: EditorFile;
   if (/\.(js|css|html?|txt)$/i.test(fileName)) {
   file = { name: fileName, type: getFileType(fileName, 'text/javascript'), content: '' };
   } else {
   fileName += `.js`;
   file = { name: fileName, type: 'text/javascript', content: '' };
   }
   if (this.files.find(f => f.name === fileName)) {
   alert('file already exists');
   return;
   }
   this.fileService.select(file)
   this.addFile = false;
   this.select(file);
   }
   }
   */
}
