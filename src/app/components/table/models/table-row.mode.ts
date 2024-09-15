import { PeriodicElement } from "./periodic-element.model";

export interface TableRow {
    id: string;
    row: number;
    elements: PeriodicElement[];
}
  