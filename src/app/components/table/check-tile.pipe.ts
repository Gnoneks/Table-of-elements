import { Pipe, PipeTransform } from '@angular/core';
import { Tile } from './models/tile.model';

@Pipe({
  name: 'checkTile',
  standalone: true,
})
export class CheckTilePipe implements PipeTransform {
  transform(tile: Tile, highlightedTiles: Tile[]): boolean {
    return highlightedTiles.some(
      (t) => t.column === tile.column && t.row === tile.row
    );
  }
}
