import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'slicing',
  standalone: true
})
export class SlicingPipe implements PipeTransform {

  transform(name: string, limit: number): string {
    return name.split(' ').slice(0, limit).join(' ');
  }

}
