import { Injectable } from '@angular/core';
import {
  Http,
  Response,
  Headers,
  RequestOptions,
  JsonpModule,
} from '@angular/http';

import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SystemHardwareDetailsService {

  private baseUrlString: string = 'http://localhost:3000';

  constructor(private http: Http) { }

  getSystemHardwareDetailsData() {
    return this.http
      .get(this.baseUrlString + '/api/getHardwareDetails')
      .pipe(
        map((res: Response) => res.json()),
        catchError(<T>(error: any, result?: T) => {
          return of(result as T);
        })
      );
  }
}
