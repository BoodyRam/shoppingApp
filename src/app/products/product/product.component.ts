import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product.model';
import { ApiFunctionService } from '../services/api-function.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: Product[] = []
  constructor(private service: ApiFunctionService) { 
    this.fetchData()
  }

  ngOnInit(): void {
  }
  fetchData(){
    this.service.getProduct().subscribe(responseData => {
      this.products = responseData;
    })
  }
  onDeleteProduct(id:any){
    this.service.deleteProduct(id).subscribe(()=>{
      console.log(id)
      this.fetchData()
    })
  }
  onClearProducts(){
    this.service.clearProducts().subscribe(()=>{
      this.fetchData()
    })
  }

}
