import { ElementType } from '../element-type.enum';

export interface PeriodicElement {
  position: number;
  name: string;
  weight: number;
  symbol: string;
  column: number;
  type: ElementType;
}
