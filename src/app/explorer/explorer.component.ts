import { Component, OnInit } from '@angular/core';
import { EditorFile, FileService } from '../file/file.service';

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.scss']
})
export class ExplorerComponent implements OnInit {
  public files?: EditorFile[];

  constructor(private fileService: FileService) { }

  ngOnInit(): void {
    this.fileService.subscribe(
      files => this.files = files,
      err => console.error(err)
    );
  }

  public select(file: EditorFile): void {
    console.log('select', file);
    this.fileService.select(file);
  }
}
