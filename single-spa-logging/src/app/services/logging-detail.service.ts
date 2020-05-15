import { Injectable } from '@angular/core';
import {
  Http,
  Response
} from '@angular/http';

import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoggingDetailService {

  private baseUrlString: string = 'http://localhost:3000';

  constructor(private http: Http) { }

  getLoggingDetails() {
    return this.http
      .get(this.baseUrlString + '/api/getLoggingDetails')
      .pipe(
        map((res: Response) => res.json()),
        catchError(<T>(error: any, result?: T) => {
          return of(result as T);
        })
      );
  }

  writeAuditDataToFile(data: any) {
    let auditData = { 'auditDataContent': data };
    console.log('data============ ', auditData);
    return this.http.post(this.baseUrlString + '/api/writeAuditDataToFile/', auditData).
      pipe(map((res: Response) => res.json()),
        catchError(<T>(error: any, result?: T) => {
          return of(result as T);
        })
      );
  }

  clearLogFile() {
    return this.http
      .get(this.baseUrlString + '/api/clearLogFile')
      .pipe(
        map((res: Response) => res.json()),
        catchError(<T>(error: any, result?: T) => {
          return of(result as T);
        })
      );
  }

  getAllHistoryAudit() {
    return this.http
      .get(this.baseUrlString + '/api/getAllAuditData')
      .pipe(
        map((res: Response) => res.json()),
        catchError(<T>(error: any, result?: T) => {
          return of(result as T);
        })
      );
  }

}
