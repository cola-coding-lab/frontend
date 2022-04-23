import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() { }

  public save(key: string, data: any): void {
    const value = (typeof data === 'string') ? data : JSON.stringify(data);
    localStorage.setItem(key, value);
  }

  public get(key: string): string | undefined {
    return localStorage.getItem(key) || undefined;
  }

  public getObject(key: string): any {
    const data = this.get(key);
    if (data) {
      try {
        return JSON.parse(data);
      } catch (e) {
        console.error('error parsing data from storage', e);
        return undefined;
      }
    }
    return undefined;
  }

  public all(): string[][] {
    return Object.entries<string>(localStorage);
  }

  public remove(key: string): void {
    localStorage.removeItem(key);
  }
}
