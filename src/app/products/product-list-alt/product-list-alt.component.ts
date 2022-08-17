import { ChangeDetectionStrategy, Component } from '@angular/core';

import { catchError, EMPTY, Observable, Subject } from 'rxjs';

import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list-alt.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListAltComponent{
  pageTitle = 'Products';
 private errorMessageSuject = new Subject<string>();
 errorMessage$ = this.errorMessageSuject.asObservable();

  products$ = this.productService.productsWithCategories$.pipe(
    catchError(err => {
      this.errorMessageSuject.next(err);
      return EMPTY;
    })
  );

  selectedProduct$ = this.productService.selectProduct$;

  constructor(private productService: ProductService) { }




  onSelected(productId: number): void {
    this.productService.selectedProductChanged(productId);
  }
}
