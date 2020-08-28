import { Component, OnInit } from '@angular/core';
import {CommonService} from './../common.service';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import {FormGroup, FormControl,FormArray, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart:any = [];
  cartList:any = [];
  count:number=0;
  quantity:number=2;
  check:number=0;
  total:number=0;
  Orders:any=[];
  FinalOrder:any = {};
  id:number;
  dishid:number;
  disable:boolean=true


  constructor(private formBuilder: FormBuilder,private service:CommonService,private router: Router,private _route: ActivatedRoute) { }

  ngOnInit() {
    this.cart=this.service.getCartItems();


    console.log(this.cart)
    this.id=this._route.snapshot.queryParams['user'];
    this.dishid=this._route.snapshot.queryParams['dishid'];


  for(this.count=0;this.count<this.cart.length;this.count++)
        {
      this.total+=this.cart[this.count].price*this.cart[this.count].quant

        }
  }


  addCart(item){
    if(this.cartList.length>0)
    {
      for(this.count=0;this.count<this.cartList.length;this.count++)
      {

        if(this.cartList[this.count].Name==item.Name){

            this.check=1;
            break;

        }else
        {

            this.check=0;
        }
      }
      if(this.check==0){
        this.cartList.push({Name:item.Name,Price:item.price,Image:item.Image,quant:this.quantity,id:this.dishid})

      }
      else{
        this.cartList[this.count].quant++;


      }
    }
    else{
      this.cartList.push({Name:item.Name,Price:item.price,Image:item.Image,quant:this.quantity,id:this.dishid})

    }
    this.total=0
    for(this.count=0;this.count<this.cartList.length;this.count++)
          {
        this.total+=this.cartList[this.count].Price*this.cartList[this.count].quant

          }
          var i;
          for(i=0;i<this.cartList.length;i++){
          // if(this.cartList[i].quant>0){
          //   console.log(this.cartList[i].quant)
          //   this.disable=false
          // }
          // else{

          //   console.log(this.cartList[i].quant)
          //   this.disable=true
          // }
          }
}

removeCart(item){
  if(this.cartList.length>0)
  {
    for(this.count=0;this.count<this.cartList.length;this.count++)
    {

      if(this.cartList[this.count].Name==item.Name){

          this.check=1;
          break;

      }else
      {

          this.check=0;
      }
    }
    if(this.check==0){
      this.cartList.push({Name:item.Name,Price:item.price,Image:item.Image,quant:this.quantity,id:this.dishid})

    }
    else{
      this.cartList[this.count].quant--;


    }
  }
  else{
    this.cartList.push({Name:item.Name,Price:item.price,Image:item.Image,quant:this.quantity,id:this.dishid})

  }
  this.total=0
  for(this.count=0;this.count<this.cartList.length;this.count++)
        {
      this.total+=this.cartList[this.count].Price*this.cartList[this.count].quant

        }

      }
  placeOrder(){
    // this.FinalOrder.push({'orders':this.cartList})
    // this.Orders.push('orders':this.FinalOrder);

    this.FinalOrder.Name = this.cartList;
    this.FinalOrder.userId = this.id;

    this.service.placeOrders(this.FinalOrder).subscribe(data =>
      {
        alert(data.result)
        // this.router.navigate(['/list/foodItems'])
      }
      , error =>{});
    }

  }
