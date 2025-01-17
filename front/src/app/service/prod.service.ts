import { Injectable } from '@angular/core';
import { Product } from '../models/prod';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProdService {

  public constructor(private _httpClient: HttpClient){
  }

  public get(){
    return this._httpClient.get<Product[]>('/api/product');
  }

  public add(Product: Product){
    return this._httpClient.post<Product>('/api/product', Product);
  }

  public put(Product: Product){
    return this._httpClient.put('/api/product/' + Product.id, Product);
  }

  public delete(id: number) {
    return this._httpClient.delete(`/api/product/${id}`);
  }
}
