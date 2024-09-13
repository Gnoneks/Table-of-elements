import { Component, ElementRef, OnInit, viewChild } from '@angular/core';
import { PeriodicElement, TABLE_DATA } from '../../data/elements.data';

const COLUMNS_COUNT = 18;
const ROWS_COUNT = 9;

interface Tile {
  column: number;
  element?: PeriodicElement;
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements OnInit {
  gridRef = viewChild<ElementRef>('gridRef');

  readonly tableData = TABLE_DATA;

  // tiles: Coords[] = [];
  tableRows: { rowNumber: number; tiles: Tile[] }[] = this._initiateTable();

  ngOnInit(): void {
    // this._initiateTable();
  }

  private _initiateTable() {
    const tableRows = [];

    for (let y = 0; y < ROWS_COUNT; y++) {
      const tiles = [];

      for (let x = 0; x < COLUMNS_COUNT; x++) {
        const tileData = this.tableData.rows[y]?.elements.find(
          (element) => element.rowPosition === x + 1
        );
        console.log(this.tableData.rows[y]);
        tiles.push({ column: x + 1, element: tileData ? tileData : undefined });
      }

      tableRows.push({ rowNumber: y + 1, tiles });
    }

    console.log(tableRows);

    return tableRows;
  }

  private _generateEmptyTiles() {
    // TABLE_DATA.rows.map(())
  }
}
