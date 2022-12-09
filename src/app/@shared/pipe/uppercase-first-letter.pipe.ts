import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'uppercaseFirstLetter',
})
export class UppercaseFirstLetterPipe implements PipeTransform {
  transform(value: string, ...args: string[]): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}
