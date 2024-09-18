import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TableRow } from './models/table-row.mode';

const DATABASE_URL = 'http://localhost:3000';

@Injectable()
export class TableService {
  constructor(private readonly _http: HttpClient) {}

  getTableData(): Observable<TableRow[]> {
    return this._http.get<TableRow[]>(DATABASE_URL + '/table');
  }
}
