import { PeriodicElement } from "../../models/periodic-element.model";

export interface Tile {
    column: number;
    row: number;
    element?: PeriodicElement;
  }
  