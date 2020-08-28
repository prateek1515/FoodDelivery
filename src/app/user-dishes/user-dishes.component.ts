import { Component, OnInit } from '@angular/core';
import {CommonService} from './../common.service';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import {FormGroup, FormControl,FormArray, FormBuilder, Validators} from '@angular/forms';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-user-dishes',
  templateUrl: './user-dishes.component.html',
  styleUrls: ['./user-dishes.component.css']
})
export class UserDishesComponent implements OnInit {
  private id;
  private check:number=1;
  private count:number=0;

  private quantity:number=1;
  private items:any=[];

  private cartList1:any=[];
  private cartList:any=[];
  private userid;
  private button:boolean=true;
  constructor(private formBuilder: FormBuilder,private service:CommonService,private router: Router,private _route: ActivatedRoute) { }

  ngOnInit() {
    this.id=this._route.snapshot.queryParams['dishid'];

    this.userid=this._route.snapshot.queryParams['userid'];
    this.getDish();
    // this.cartItems();
  }
getDish(){
    this.service.getDish({'id':this.id}).subscribe((data:any) =>
      {
        data.map(items=>{
          var imageName:string = items.Image
          return items.Image =imageName.substring(imageName.lastIndexOf('\\')+1,imageName.length);
        })
        this.items=data
         var i=0
          for(i=0;i<this.items.length;i++)
          {
            this.items[i].button="ADD DISH"

        }
      }
      , error =>{});
    }
    // this.count=0;
    addCart(item)
    {

       for(this.count=0;this.count<this.cartList.length;this.count++)
         {
           this.check=1
           if(item.Name==this.cartList[this.count].Name)
           {
             this.check=0
             break
           }
          }
          if(this.check==1)
          {
            // if(this.button==true){
            //   this.button=false
            // }
            // else{
            //   this.button=true
            // }


              item.button="REMOVE DISH"
              item.quant=1;
            this.cartList.push(item);

          }
          else{
            if(this.button==true){
              this.button=false
            }
            else{
              this.button=true
            }
            if(this.button==true){
              item.button="REMOVE DISH"
            }
            else{
              item.button="ADD DISH"
            }

          }


    }

    cartItems(){
      var i=0
      for(i=0;i<this.cartList.length;i++){
        if(this.cartList[i].button=='REMOVE DISH'){
          this.cartList1.push(this.cartList[i])

        }
      }
      this.service.cartItems(this.cartList1)
      this.router.navigate(['/user/dishes/cart'],{queryParams:{dishid:this.id,user:this.userid}});


    }


}
