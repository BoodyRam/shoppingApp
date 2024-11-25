import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiFunctionService {
  url = 'https://fir-project-exercise-default-rtdb.firebaseio.com/products.json'

  constructor(private http: HttpClient) { }

  postProduct(product: any){
    return this.http.post<Product>(this.url, product)
  }
  getProduct(){
    return this.http.get<{[key: string] : Product}>(this.url).pipe(map(responseData => {
      const productArr : Product[] = []
      for (const key in responseData){
        if (responseData.hasOwnProperty(key)){
          productArr.push({...responseData[key], id:key})
        }
      }
      return productArr;
    }))
  }
  clearProducts(){
    return this.http.delete(this.url)
  }
  deleteProduct(id:string){
    return this.http.delete('https://fir-project-exercise-default-rtdb.firebaseio.com/products/'+id+'.json')
  }
  editProduct(id:string, model: string){
    return this.http.put('https://fir-project-exercise-default-rtdb.firebaseio.com/products/'+id+'.json', model)
  }
  getItem(id: any){
    return this.http.get(`http://localhost:4200/products/${id}/edit`)
  }
}
