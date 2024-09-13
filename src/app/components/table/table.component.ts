import { Component } from '@angular/core';
import { TABLE_DATA } from '../../data/elements.data';
import { PeriodicElement } from '../../models/periodic-element.model';
import { Tile } from './tile.model';

const COLUMNS_COUNT = 18;
const ROWS_COUNT = 9;

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  readonly tableData = TABLE_DATA;

  tableRows: { rowNumber: number; tiles: Tile[] }[] = this._initiateTable();

  private _initiateTable() {
    const tableRows = [];

    for (let rowIdx = 0; rowIdx < ROWS_COUNT; rowIdx++) {
      const tiles = [];

      for (let colIdx = 0; colIdx < COLUMNS_COUNT; colIdx++) {
        const tileData = this.tableData.rows[rowIdx]?.elements.find(
          (element) => element.rowPosition === colIdx + 1
        );
        console.log(this.tableData.rows[rowIdx]);
        tiles.push({
          column: colIdx + 1,
          row: rowIdx + 1,
          element: tileData ? tileData : undefined,
        });
      }

      tableRows.push({ rowNumber: rowIdx + 1, tiles });
    }

    return tableRows;
  }
}
