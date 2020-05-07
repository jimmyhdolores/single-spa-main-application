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
export class WindowTerminalService {

  private baseUrlString: string = 'http://localhost:3000';

  constructor(private http: Http) { }


  executeCommand(command) {
    return this.http
      .get(this.baseUrlString + '/api/executeCommands/' + command)
      .pipe(
        map((res: Response) => res.json()),
        catchError(<T>(error: any, result?: T) => {
          return of(result as T);
        })
      );
  }

  getExecutedCommands() {
    return this.http
      .get(this.baseUrlString + '/api/getExecutedCommands')
      .pipe(
        map((res: Response) => res.json()),
        catchError(<T>(error: any, result?: T) => {
          return of(result as T);
        })
      );
  }
}
