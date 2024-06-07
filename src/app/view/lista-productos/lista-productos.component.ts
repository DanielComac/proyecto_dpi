import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Producto } from 'src/app/model/producto';
import { ProductoService } from 'src/app/service/producto.service';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.scss']
})
export class ListaProductosComponent implements OnInit {
  ListaProductos: Producto[] = [];
  productList!: MatTableDataSource<Producto>;

  columnsHeader = ["date", "name", "price", "amount", "status", "opciones"];

  constructor(private productService: ProductoService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getProduct();
  }

  productListMethod() {
    try {
      this.productService.getProducts()
        .subscribe(item => this.productList = new MatTableDataSource(item))
    } catch (error) {
      console.log(error)
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.productList.filter = filterValue.trim();
  }


  async getProduct() {
    try {
      this.productService.getProducts()
        .subscribe(item => {
          this.productList = new MatTableDataSource(item); // Asignación correcta a productList
          console.log(this.productList.data); // Verifica los datos aquí
        });
    } catch (error) {
      console.log(error);
    }
  }
}

