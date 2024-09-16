import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'propToClass',
  standalone: true,
})
export class PropToClassPipe implements PipeTransform {
  transform(value: string): string {
    return value.toLocaleLowerCase().replaceAll(' ', '-');
  }
}
