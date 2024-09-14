import { Component, inject } from '@angular/core';
import { TABLE_DATA } from '../../data/elements.data';
import { Tile } from './tile.model';
import { DeviceCheckerService } from '../../shared/device-checker.service';
import { AsyncPipe } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PeriodicElement } from '../../models/periodic-element.model';
import { EditTileDialogComponent } from './edit-tile-dialog/edit-tile-dialog/edit-tile-dialog.component';
import { filter } from 'rxjs';

const COLUMNS_COUNT = 18;
const ROWS_COUNT = 9;

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [AsyncPipe, MatDialogModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  private _tableData = structuredClone(TABLE_DATA);

  tableRows: { rowNumber: number; tiles: Tile[] }[] = this._initiateTable();
  // TODO TableData will come from request
  readonly isMobile$ = this._deviceCheckerService.isMobile();

  private readonly _dialog = inject(MatDialog);

  constructor(private readonly _deviceCheckerService: DeviceCheckerService) {}

  private _initiateTable() {
    this.isMobile$?.subscribe((val) => console.log(val));
    const tableRows = [];

    for (let rowIdx = 0; rowIdx < ROWS_COUNT; rowIdx++) {
      const tiles = [];

      for (let colIdx = 0; colIdx < COLUMNS_COUNT; colIdx++) {
        const tileData = this._tableData.rows[rowIdx]?.elements.find(
          ({ column }) => column === colIdx + 1
        );

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

  openEditDialog(tileData: Tile) {
    this._dialog
      .open(EditTileDialogComponent, {
        data: tileData.element,
      })
      .afterClosed()
      .pipe(filter(Boolean))
      .subscribe((editedElement) => this._updateTile(tileData, editedElement));
  }

  private _updateTile(tileData: Tile, editedElement: PeriodicElement) {
    const editedRow = tileData.row - 1;
    const elementIdx = this.tableRows[editedRow].tiles.findIndex(
      (el) => el.column === tileData.column
    );

    this.tableRows[editedRow].tiles[elementIdx].element = editedElement;
  }
}
