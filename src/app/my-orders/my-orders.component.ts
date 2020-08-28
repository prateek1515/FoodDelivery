import { Component, OnInit } from '@angular/core';
import {CommonService} from './../common.service';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import {FormGroup, FormControl,FormArray, FormBuilder, Validators} from '@angular/forms';
import { concat } from 'rxjs/internal/observable/concat';
import { ReturnStatement } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  AllOrder:any={}
  order:any={}
  count:number=0
  orderArray:any=[]
  total:number=0
  t:any={}
  hotelName:any={};
  p:any=[];
  constructor(private formBuilder: FormBuilder,private service:CommonService,private router: Router,private _route: ActivatedRoute) { }

  ngOnInit() {
    this.findUser()
  }
  getResName(id){
    this.t.id=id

    this.service.getRes(this.t).subscribe(data=>
    {

      this.p.push(data[0].name)


    }
    )
    this.hotelName.name=this.p
  }
  findUser()
  {

    this.order.id="5f36215856e6900b2897311e"
    this.service.findOrder(this.order).subscribe(data =>
      {
        this.AllOrder=data

       for(this.count=0;this.count<this.AllOrder.length;this.count++){



        var orderTotal = 0;

        this.AllOrder[this.count].Name.forEach(orderItem => {


          this.getResName(orderItem.id)
          orderItem.hotel=this.hotelName

          orderItem.time=this.AllOrder[this.count].time
          orderTotal+=orderItem.Price * orderItem.quant;
        });

        this.orderArray.push({orderDetails:this.AllOrder[this.count].Name,totalAmount:orderTotal});

      }

      })
  }
}
