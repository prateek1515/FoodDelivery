import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import {CommonService} from './../common.service';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  private adminForm:FormGroup;
  constructor(private formbuilder:FormBuilder,private service:CommonService,private router: Router,private _route: ActivatedRoute) { }
  hotelList:any=[]
  ngOnInit() {
    this.adminForm=this.formbuilder.group({
      name:new FormControl('',[Validators.required]),
      veg:new FormControl('',[Validators.required]),
      city:new FormControl('',[Validators.required]),
      image:new FormControl('',[Validators.required]),
  });
  const id=this._route.snapshot.params['id'];
  console.log(id);


}
saveHotel(){
 this.service.saveRestuarant(this.adminForm.value).subscribe(data =>
            {
              this.router.navigate(['/list'])

            }
            , error =>{});

          }
  getHotel(){

  this.service.findRestuarant().subscribe(data =>
    {
      console.log(data);
      // data.map(hotel=>{
      //   var path:string="/home/puneet/foodOrder/FoodOrder/src/assets/images"
      //   var imageName:string = hotel.image;
      //   return hotel.image =imageName.substring(imageName.lastIndexOf('\\')+1,imageName.length);
      // })

      this.hotelList = data;
      alert(data[0].name)
    }
    , error =>{});

  }

}

