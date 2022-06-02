import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

export abstract class BaseApiService {
  protected readonly uri: string = `${environment.api.src}/${environment.api.version}/`;
  protected readonly base: string = (`${location?.origin}` || this.uri) + environment.baseHref;

  protected constructor(
    protected readonly http: HttpClient,
  ) {}

  protected fromApi(path: string): string {
    return `${this.uri}${path}`;
  }
}
