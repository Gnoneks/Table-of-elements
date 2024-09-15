import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Tile } from './models/tile.model';
import { DeviceCheckerService } from '../../shared/device-checker.service';
import { AsyncPipe } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PeriodicElement } from './models/periodic-element.model';
import { EditTileDialogComponent } from './edit-tile-dialog/edit-tile-dialog/edit-tile-dialog.component';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  Subject,
  takeUntil,
  throwError,
} from 'rxjs';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CheckTilePipe } from './check-tile.pipe';
import { TableService } from './table.service';

const COLUMNS_COUNT = 18;
const ROWS_COUNT = 9;

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    AsyncPipe,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    CheckTilePipe,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  providers: [TableService],
})
export class TableComponent implements OnInit, OnDestroy {
  tableRows: { rowNumber: number; tiles: Tile[] }[] = [];
  filterControl = new FormControl('');
  highlightedTiles: Tile[] = [];

  readonly isMobile$ = this._deviceCheckerService.isMobile();

  private readonly _dialog = inject(MatDialog);
  private readonly _destroy$ = new Subject<void>();

  constructor(
    private readonly _deviceCheckerService: DeviceCheckerService,
    private readonly _tableService: TableService
  ) {}

  ngOnInit() {
    this._initiateTable();
    this._listenToFilterChange();
  }

  private _initiateTable() {
    this._tableService
      .getTableData()
      .pipe(catchError((err) => throwError(() => err)))
      .subscribe((data) => {
        const tableRows = [];

        for (let rowIdx = 0; rowIdx < ROWS_COUNT; rowIdx++) {
          const tiles = [];

          for (let colIdx = 0; colIdx < COLUMNS_COUNT; colIdx++) {
            const tileData = data[rowIdx]?.elements.find(
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

        this.tableRows.push(...tableRows);
      });
  }

  private _listenToFilterChange() {
    this.filterControl.valueChanges
      .pipe(
        debounceTime(2000),
        distinctUntilChanged(),
        takeUntil(this._destroy$)
      )
      .subscribe((searchValue) => {
        this.highlightedTiles = [];

        if (searchValue) this._searchTiles(searchValue);
      });
  }

  private _searchTiles(searchValue: string) {
    for (let rowIdx = 0; rowIdx < this.tableRows.length; rowIdx++) {
      const row = this.tableRows[rowIdx];

      for (let tileIdx = 0; tileIdx < row.tiles.length; tileIdx++) {
        const tile = row.tiles[tileIdx];

        if (
          tile.element &&
          this._checkTileIncludesValue(tile.element, searchValue)
        ) {
          this.highlightedTiles.push(tile);
        }
      }
    }
  }

  private _checkTileIncludesValue(
    element: PeriodicElement,
    searchValue: string
  ) {
    return Object.values(element).some((value) => {
      const valueStr = value.toString().toLowerCase();

      return valueStr.includes(searchValue.toLowerCase());
    });
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

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
