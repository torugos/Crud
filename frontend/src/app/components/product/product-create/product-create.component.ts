import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import {Router} from '@angular/router'
import { Product } from '../product.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  // product: Product = {
  //   name:'',
  //   price: null
  // }

  formulario: FormGroup = this.formbuilder.group({
    name:['', Validators.required],
    price:['', Validators.required]
  })

  constructor(
    private productService: ProductService,
    private router: Router,
    private formbuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  createProduct(): void{
    this.productService.create(this.formulario.value).subscribe(() =>{
      this.productService.showMessage('Operação executada com sucesso!')
      this.router.navigate(['/products'])
    })
  }

  cancel(): void{
    this.router.navigate(['/products'])
  }
}
