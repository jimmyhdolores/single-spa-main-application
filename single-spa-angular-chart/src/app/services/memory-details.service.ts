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
export class MemoryDetailsService {

  private baseUrlString: string = 'http://localhost:3000';

  constructor(private http: Http) { }

  getMemoryDetailsData() {
    return this.http
      .get(this.baseUrlString + '/api/getMemoryDetails')
      .pipe(
        map((res: Response) => res.json()),
        catchError(<T>(error: any, result?: T) => {
          return of(result as T);
        })
      );
  }

  getDiskWiseMemoryData() {
    return this.http
      .get(this.baseUrlString + '/api/getDiskWiseMemoryDetails')
      .pipe(
        map((res: Response) => res.json()),
        catchError(<T>(error: any, result?: T) => {
          return of(result as T);
        })
      );
  }
}
