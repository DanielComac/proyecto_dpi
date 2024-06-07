import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Producto } from '../model/producto';
import { ProductoService } from '../service/producto.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  formGroup!: FormGroup

  constructor(public dialogRef: MatDialogRef<ProductoService>,
    @Inject(MAT_DIALOG_DATA) public data: Producto,
    private formBuilder: FormBuilder,
    private productoService: ProductoService
  ) { }

  ngOnInit(): void {
    this.initForm()
  }

  initForm() {
    if (!this.data) {
      this.formGroup = this.formBuilder.group({
        name: ["", Validators.required],
        code: ["", Validators.required],
        category: ["", Validators.required],
        description: ["", Validators.required],
        price: ["", Validators.required],
        amount: ["", Validators.required]
      });
    } else {
      this.formGroup = this.formBuilder.group({
        name: [this.data.name || "", Validators.required],
        code: [this.data.code || "", Validators.required],
        category: [this.data.category || "", Validators.required],
        description: [this.data.description || "", Validators.required],
        price: [this.data.price || "", Validators.required],
        amount: [this.data.amount || "", Validators.required]
      });
    }


  }

  save(): void {
    if (this.formGroup.valid) {
      const productoData = this.formGroup.value;
      this.productoService.createProduct(productoData).subscribe(
        (response) => {
          console.log('Producto creado exitosamente', response);
          this.dialogRef.close(true);
        },
        (error) => {
          console.error('Error al crear el producto', error);
        }
      );
    } else {
      console.error('El formulario no es válido');
      this.dialogRef.close(false);
    }
  }

}
