import { Component, OnInit } from '@angular/core';
import { EditorFile, FileService } from '../file/file.service';

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.scss'],
})
export class ExplorerComponent implements OnInit {
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
}
