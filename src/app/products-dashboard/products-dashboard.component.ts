import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { ApiService } from '../shared/api.service';
import { ProductModels } from './products-dashboard.models';

@Component({
  selector: 'app-products-dashboard',
  templateUrl: './products-dashboard.component.html',
  styleUrls: ['./products-dashboard.component.css']
})
export class ProductsDashboardComponent implements OnInit {
  formProduct!: FormGroup;
  productModel : ProductModels = new ProductModels();
  productData : any;
  showAdd!: boolean;
  showEdit!: boolean;


  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.formProduct = new FormGroup({
      name: new FormControl(),
      price: new FormControl(),
      stock: new FormControl(),
      image: new FormControl(),
    }),
    this.getProduct()
  }

  postProduct(){
    this.productModel.name = this.formProduct.value.name
    this.productModel.price = this.formProduct.value.price
    this.productModel.stock = this.formProduct.value.stock
    this.productModel.image = this.formProduct.value.image
    this.api.postProduct(this.productModel)
    .subscribe(res=>{
      Swal.fire("Complete","Add Product Compelete","success")
      this.getProduct()
      let close = document.getElementById("close")
      close!.click()
    },
    err=>{
      Swal.fire("Error","Add Product Error","error")
    })
  }

  getProduct(){
    this.api.getProduct()
    .subscribe(res=>{
      this.productData = res;
    })
  }

  deleteProduct(id:number){
    this.api.deleteProduct(id)
    .subscribe(res=>{
      Swal.fire("Complete","Delete Product Compelete","success")
      this.getProduct()
    },
    err=>{
      Swal.fire("Error","Delete Product Error","error")
    })
  }

  clickAdd(){
    this.formProduct.reset()
    this.showAdd = true;
    this.showEdit = false;
  }

  clickEdit(data:any){
    this.showAdd = false;
    this.showEdit = true;
    this.productData.id = data.id
    this.formProduct.controls['name'].setValue(data.name)
    this.formProduct.controls['price'].setValue(data.price)
    this.formProduct.controls['stock'].setValue(data.stock)
    this.formProduct.controls['image'].setValue(data.image)
  }

  updateProduct(){
      this.productModel.name = this.formProduct.value.name
      this.productModel.price = this.formProduct.value.price
      this.productModel.stock = this.formProduct.value.stock
      this.productModel.image = this.formProduct.value.image
      this.api.updateProduct(this.productData.id,this.productModel)
      .subscribe(res=>{
        Swal.fire("Complete","Update Product Compelete","success")
        this.getProduct()
        let close = document.getElementById("close")
        close!.click()
      },
      err=>{
        Swal.fire("Error","Update Product Error","error")
      })
  }
}
