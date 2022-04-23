import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ModalComponent } from '../../modal/modal.component';
import { Project } from '../../project/project';
import { ApiService } from '../explorer/project/api.service';
import { ProjectService } from '../explorer/project/project.service';
import { environment } from '../../../environments/environment';
import { IPwaData } from './export.model';
import { ProjectFileService } from '../../project/project-file.service';
import { downloadBlob } from '../../../util/download';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.scss']
})
export class ExportComponent implements OnInit {
  private static readonly DEFAULT_TITLE = 'Meine App';

  @ViewChild('modal', { static: false }) modal!: ModalComponent;
  public pwaExportForm = new FormGroup({
    pwa_title: new FormControl(null, { validators: [Validators.required, Validators.minLength(1)] }),
    pwa_color: new FormControl(null, { validators: [Validators.required] }),
    pwa_description: new FormControl(null, { validators: [Validators.required, Validators.minLength(1)] }),
    pwa_css: new FormControl(),
    pwa_logo: new FormControl(),
  });
  public project?: Project;

  private p5js = '';

  constructor(
    private apiService: ApiService,
    private projectFileService: ProjectFileService,
    private projectService: ProjectService,
  ) {
    this.apiService.getP5JS().subscribe(value => this.p5js = value.script);
    this.projectService.subscribeActive(active => {
      if (active) {
        this.project = Project.fromJson(active);
        this.pwaExportForm.patchValue({ pwa_title: active.title });
        this.pwaExportForm.patchValue({ pwa_description: active.description });
      }
    });
  }

  ngOnInit(): void {
    this.pwaExportForm.get('pwa_color')?.setValue('#FFFFFF');
  }

  public async onPwaSubmit(): Promise<void> {
    if (!this.pwaExportForm.valid) {
      return;
    }

    let image;
    try {
      image = await this.getPwaImage();
    } catch (e) {
      console.error(e);
    }

    const data: IPwaData = {
      pwa_title: this.pwaExportForm.value.pwa_title,
      pwa_color: this.pwaExportForm.value.pwa_color,
      pwa_css: this.pwaExportForm.value.pwa_css || undefined,
      pwa_image: image?.toString(),
      pwa_scripts: this.projectFileService.allStoredFiles().map(f => f.content || ''),
      pwa_description: this.pwaExportForm.value.pwa_description,
    };

    this.apiService.postPWA(data).subscribe(
      value => {
        console.log(value);
        this.apiService.getPWAZip(`${data.pwa_title}.zip`).subscribe(
          zip => {
            console.log(zip);
            if (zip.type === 'application/zip') {
              const download = downloadBlob(zip, `${this.pwaExportForm.value.pwa_title}.zip`);
              download.click();
              this.modal.close();
            }
          },
          error => {
            console.error(error);
            this.downloadError();
          },
        );
      },
      error => {
        console.error(error);
        this.downloadError();
      },
    );
  }

  public onFileSelect($event: Event): void {
    const file = ($event.target as HTMLInputElement).files?.[0];
    this.pwaExportForm.patchValue({ pwa_logo: file });
    this.pwaExportForm.get('pwa_logo')?.setValidators(imageValidator());
    this.pwaExportForm.get('pwa_logo')?.updateValueAndValidity({ onlySelf: true });
  }

  public logoError(): string {
    let ret = '';
    const typeError = this.pwaExportForm.get('pwa_logo')?.errors?.invalidType;
    const sizeError = this.pwaExportForm.get('pwa_logo')?.errors?.invalidSize;

    ret += sizeError ? ` Bild zu groß [${(sizeError.value / (1024 * 1024 * 2)).toFixed(2)}MB] ` : '';
    ret += typeError ? ` Ungültiges Dateiformat [${typeError.value}]` : '';
    return ret;
  }

  public downloadHtml(): void {
    const project = this.projectService.activeProject;
    const iframe = document.createElement('iframe');
    iframe.src = 'assets/iframe/iframe.html';
    iframe.onload = () => {
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      if (doc) {
        doc.title = project?.title || ExportComponent.DEFAULT_TITLE;
        if (this.p5js && this.p5js !== '') {
          addScript(doc, { innerHTML: this.p5js });
        } else {
          addScript(doc, { src: environment.p5CDN });
        }
        // remove 'settings' from iframe
        doc.querySelector('script#settings')?.remove();
        // see https://medium.com/swlh/components-inside-iframe-and-data-binding-in-angular-ac10eb6ab54b
        for (const file of project?.files || []) {
          addScript(doc, { innerHTML: file.content });
        }
      }
      if (doc?.documentElement?.outerHTML || doc?.documentElement?.innerHTML) {
        const dl = downloadBlob(new Blob([doc.documentElement.outerHTML || doc.documentElement.innerHTML]),
          `${project?.title || ExportComponent.DEFAULT_TITLE}.html`);
        dl.click();
        document.body.removeChild(iframe);
      }
    };
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
    iframe.contentWindow?.location.reload();
  }

  private async getPwaImage(): Promise<string | ArrayBuffer | undefined> {
    const image = this.pwaExportForm.value.pwa_logo;
    if (image) {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      return new Promise<string | ArrayBuffer | undefined>((resolve, reject) => {
        reader.onload = _ => {
          // return only base64 data, not full DataURL
          resolve(reader.result?.toString()?.split(',').pop());
        };
        reader.onerror = error => { reject(error); };
      });
    }
    return undefined;
  }

  private downloadError(custom?: string, onlyCustom = false): void {
    const base = 'Etwas ist beim Generieren/Download leider schiefgegangen';
    const text = (custom && onlyCustom) ? custom : `${base}\n${custom}`;
    alert(text);
    this.modal.close();
  }
}


function imageValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (!control.value) { return null; }
    const validType = ['image/png', 'image/jpeg'].includes(control.value?.type);
    const validSize = control.value?.size <= 2e+6;

    const err = {
      invalidType: !validType ? { value: control.value?.type || 'empty' } : undefined,
      invalidSize: !validSize ? { value: control.value?.size || 0 } : undefined,
    };

    return validType && validSize ? null : err;
  };
}

function addScript(doc: Document, options: { src?: string, innerHTML?: string }): void {
  const script = doc.createElement('script');
  if (options.src) { script.src = options.src; }
  script.innerHTML = options.innerHTML || '';
  doc.body.appendChild(script);
}

