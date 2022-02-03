import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

  produto: Product

  formulario: FormGroup = this.formbuilder.group({
    id: [null, Validators.required],
    name: ['', Validators.required],
    price: ['', Validators.required]
  })

  constructor(
    private productService: ProductService, 
    private router: Router,
    private formbuilder: FormBuilder,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
      this.productService.readById(id).subscribe(formulario =>{
      this.formulario.patchValue(formulario)
      console.log(formulario)
    });
  }

  updateProduct(): void{
    this.productService.update(this.formulario.value).subscribe(() => {
      this.productService.showMessage("produto atualizado")
      this.router.navigate(['/products'])
    });
  }

  cancel(): void{
    this.router.navigate(['/products'])
  }
}
