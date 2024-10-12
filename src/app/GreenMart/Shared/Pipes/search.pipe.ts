import { Pipe, PipeTransform } from '@angular/core';
import { Products } from '../Interfaces/products';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(products: Products[], searchText: string): Products[] {
    return products.filter((product) => product.productName.toLowerCase().includes(searchText.toLowerCase()));
  }

}
