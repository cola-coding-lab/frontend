import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IExplorer } from '../explorer.model';
import { EditorFile } from '../../../file/file.model';
import { IPwaData } from '../../export/export.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectExplorerApi {
  private readonly uri: string = `${environment.api.src}/${environment.api.version}/`;
  private readonly base: string = (`${location?.origin}` || this.uri) + environment.baseHref;

  constructor(
    private readonly http: HttpClient,
  ) { }

  public getExplorer(): Observable<IExplorer> {
    return this.http.get<IExplorer>(`${this.uri}explorer`);
  }

  public getP5JS(): Observable<{ script: string }> {
    return this.http.get<{ script: string }>(`${this.base}assets/iframe/p5.min.json`);
  }

  public getBaseFilesFallback(): Observable<EditorFile[]> {
    return this.http.get<EditorFile[]>(`${this.base}assets/files.json`);
  }

  public postPWA(data: IPwaData): Observable<any> {
    return this.http.post<any>(`${this.uri}pwa`, data);
  }

  public getPWAZip(zipFileName: string): Observable<Blob> {
    return this.http.get(`${this.uri}pwa/${zipFileName}`, {
      responseType: 'blob',
    });
  }
}
