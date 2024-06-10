import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../model/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  url = "http://localhost:5000/api/product";

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.url);
  }

  createProduct(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.url, producto);
  }

  editProduct(producto: Partial<Producto>): Observable<Producto> {
    return this.http.patch<Producto>(this.url, producto, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  deleteProduct(id: string): Observable<any> {
    console.log(id)
    return this.http.delete(`${this.url}/${id}`);
  }

}
