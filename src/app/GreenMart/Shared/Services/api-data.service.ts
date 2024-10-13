import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Products } from '../Interfaces/products';
import { Category } from '../Interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class ApiDataService {

  constructor(private _httpClient: HttpClient) { }

  getAllProducts(): Observable<Products[]>{
    return this._httpClient.get<Products[]>('http://localhost:3000/products');
  }

  getAllCategories(): Observable<Category[]>{
    return this._httpClient.get<Category[]>('http://localhost:3000/categories');
  }
  getProductsByCategoryId(id: number): Observable<Products[]>{
    return this._httpClient.get<Products[]>(`http://localhost:3000/products?category.id=${id}`);
  }
  getProductById(id: number): Observable<Products[]>{
    return this._httpClient.get<Products[]>(`http://localhost:3000/products/${id}`);
  }
}
