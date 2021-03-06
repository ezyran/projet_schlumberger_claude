import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { AddProduct } from 'src/app/Modules/client/Cart/Actions/cart.action';
import { ClientService } from 'src/app/Modules/client/Services/client.service';
import { Product } from '../../Models/product';
import { ProductService } from '../../Services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  public mProduct!: Product;

  constructor(private mRoute: ActivatedRoute, private productService: ProductService, private store: Store, public clientService: ClientService) { }

  ngOnInit(): void {
    let retrievedId: string | null = this.mRoute.snapshot.paramMap.get('productId');
    if (retrievedId)
    {
      this.productService.GetProductFromId(retrievedId).subscribe(res => this.mProduct = res);
    }
  }

  AddProductToCart(): void {
    this.store.dispatch(new AddProduct(this.mProduct));
  }

}
