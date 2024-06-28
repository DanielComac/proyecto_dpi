import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Producto } from 'src/app/model/producto';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private carrito: Producto[] = [];
  private carritoSubject = new BehaviorSubject<Producto[]>(this.carrito);
  carrito$ = this.carritoSubject.asObservable();

  agregarAlCarrito(producto: Producto) {
    this.carrito.push(producto);
    this.carritoSubject.next(this.carrito);
  }

  eliminarDelCarrito(producto: Producto) {
    this.carrito = this.carrito.filter(p => p !== producto);
    this.carritoSubject.next(this.carrito);
  }

  obtenerTotal(): number {
    return this.carrito.reduce((total, producto) => total + producto.price, 0);
  }
}
