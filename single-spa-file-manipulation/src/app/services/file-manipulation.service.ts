import { Injectable } from '@angular/core';

import { Http, Response, Headers, RequestOptions, JsonpModule } from '@angular/http';

import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FileManipulationService {

  baseUrlString: string = 'http://localhost:3000';

  constructor(private http: Http) { }

  readDataFromFile() {
    return this.http.get(this.baseUrlString +
      '/api/readingFile').
      pipe(map((res: Response) => res.json()),
        catchError(<T>(error: any, result?: T) => {
          return of(result as T);
        })
      );
  }

  writeEditDataToFile(key, value, writeEditValue) {
    let url;
    if (writeEditValue === 'Add Key Value') {
      url = this.baseUrlString + '/api/writingFile/' + key + '/' + value;
    } else if (writeEditValue === 'Edit Value') {
      url = this.baseUrlString + '/api/editingValue/' + key + '/' + value;
    } else {
      url = this.baseUrlString + '/api/editingKey/' + key + '/' + value;
    }
    return this.http.get(url).
      pipe(map((res: Response) => res.json()),
        catchError(<T>(error: any, result?: T) => {
          return of(result as T);
        })
      );
  }
}
