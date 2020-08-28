import { Component, OnInit } from '@angular/core';
import {CommonService} from './../common.service';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import {FormGroup, FormControl,FormArray, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {
  hotelList:any=[];
  id:string;
  constructor(private formBuilder: FormBuilder,private service:CommonService,private router: Router,private _route: ActivatedRoute) { }

  ngOnInit() {

    this.id=this._route.snapshot.queryParams['id'];
    this.getHotel();

  }


dishList(id){
  this.router.navigate(['/user/dishes'],{queryParams:{dishid:id,userid:this.id}});
}
getHotel(){

            this.service.findRestuarant().subscribe((data:any) =>
              {



                data.map(hotel=>{
                  console.log(hotel.image)
                  var path:string="/home/puneet/foodOrder/FoodOrder/src/assets/images";
                  var imageName:string = hotel.image;
                  if(imageName!=undefined)
                  return hotel.image =imageName.substring(imageName.lastIndexOf('\\')+1,imageName.length);
                })
                this.hotelList = data;

              }
              , error =>{});
    }
}
