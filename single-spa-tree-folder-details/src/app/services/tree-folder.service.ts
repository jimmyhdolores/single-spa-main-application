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
export class TreeFolderService {


  private baseUrlString: string = 'http://localhost:3000';
  api = '/api/getFolderDetailsDirectoryTree';

  constructor(private http: Http) { }

  setDirectoryTreeApi() {
    this.api = '/api/getFolderDetailsDirectoryTree';
  }

  setDreeApi() {
    this.api = '/api/getFolderDetailsDree';
  }

  getFolderDetails() {
    return this.http
      .get(this.baseUrlString + this.api)
      .pipe(
        map((res: Response) => res.json()),
        catchError(<T>(error: any, result?: T) => {
          return of(result as T);
        })
      );
  }
}
