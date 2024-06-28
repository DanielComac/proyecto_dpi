import { Component, OnInit } from '@angular/core';
import { CarritoService } from 'src/app/service/carrito.service';
import { Producto } from 'src/app/model/producto';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent implements OnInit {
  carrito: Producto[] = [];
  total: number = 0;

  constructor(private carritoService: CarritoService) {}

  ngOnInit(): void {
    this.carritoService.carrito$.subscribe(productos => {
      this.carrito = productos;
      this.total = this.carritoService.obtenerTotal();
    });
  }

  eliminarDelCarrito(producto: Producto) {
    this.carritoService.eliminarDelCarrito(producto);
  }
}
