import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiDataService {

  constructor(private _httpClient: HttpClient) { }

  getAllProducts(): Observable<any>{
    return this._httpClient.get<any>('https://ecommerce.routemisr.com/api/v1/products');
  }
}
