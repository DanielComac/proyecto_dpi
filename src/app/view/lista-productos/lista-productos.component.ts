import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Producto } from 'src/app/model/producto';
import { ProductFormComponent } from 'src/app/product-form/product-form.component';
import { ProductoService } from 'src/app/service/producto.service';
import { CarritoService } from 'src/app/service/carrito.service';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.scss']
})
export class ListaProductosComponent implements OnInit {
  ListaProductos: Producto[] = [];
  productList!: MatTableDataSource<Producto>;

  columnsHeader = ["date", "name", "price", "amount", "status", "opciones"];

  constructor(
    private productService: ProductoService,
    private carritoService: CarritoService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getProduct();
  }

  productListMethod() {
    try {
      this.productService.getProducts()
        .subscribe(item => {
          const filteredItems = item.filter(i => i.status);
          this.productList = new MatTableDataSource(filteredItems);
        });
    } catch (error) {
      console.log(error);
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
          const filteredItems = item.filter(i => i.status);
          this.productList = new MatTableDataSource(filteredItems); 
        });
    } catch (error) {
      console.log(error);
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(ProductFormComponent, {
      data: null,
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.productListMethod();
      }
    });
  }

  editDialog(element: Producto) {
    const dialogRef = this.dialog.open(ProductFormComponent, {
      data: element,
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.productListMethod();
      }
    });
  }

  deleteDialog(element: Producto) {
    const dialogRef = this.dialog.open(ProductFormComponent, {
      data: { ...element, eliminar: true },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.productListMethod();
      }
    });
  }

  agregarAlCarrito(producto: Producto) {
    this.carritoService.agregarAlCarrito(producto);
  }
}
