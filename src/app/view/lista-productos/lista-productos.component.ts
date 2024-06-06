import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/model/producto';
import { ProductoService } from 'src/app/service/producto.service';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.scss']
})
export class ListaProductosComponent implements OnInit{
  ListaProductos:Producto[]=[];

  constructor(private productService:ProductoService){}

ngOnInit(): void {
  this.getProduct()
}


  async getProduct(){
    try{
      this.productService.getProducts()
      .subscribe(item=>this.ListaProductos=item);
      console.log(this.ListaProductos);
    }
    catch(error){
      console.log(error);

    }
}
}

