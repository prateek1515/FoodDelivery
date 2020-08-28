import { Component, OnInit } from '@angular/core';
import {CommonService} from './../common.service';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import {FormGroup, FormControl,FormArray, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  private Hotelupdateform: FormGroup;
  constructor(private formBuilder: FormBuilder,private service:CommonService,private router: Router,private _route: ActivatedRoute) { }

  hotelList:any=[];


  ngOnInit() {
    this.getHotel();

    //this.hotelArray = this.formBuilder.array([]);


    this.Hotelupdateform = this.formBuilder.group({
      hotelArray:this.formBuilder.array([])
      // Name: new FormControl('', [Validators.required]),
      // Veg:new FormControl('',[Validators.required]),

  });



}

get hotelArray()
{
  return this.Hotelupdateform.get('hotelArray') as FormArray;
}

addHotel(hotel)
{

  console.log(hotel._id)
  this.hotelArray.push(this.formBuilder.group({
    Name: new FormControl(hotel.name, [Validators.required]),
    Veg:new FormControl(hotel.veg,[Validators.required]),
    Image: new FormControl(hotel.image, [Validators.required]),
    City:new FormControl(hotel.city,[Validators.required]),
    _id:new FormControl(hotel._id),
  }))
}

deleteFormArray()
{
  while(this.hotelArray.length!=0){
    this.hotelArray.removeAt(0);
  }
}

getHotel(){

          this.service.findRestuarant().subscribe((data:any) =>
            {


              this.deleteFormArray();

              data.map(hotel=>{
                console.log(hotel.image)
                var path:string="/home/puneet/foodOrder/FoodOrder/src/assets/images";
                var imageName:string = hotel.image;
                if(imageName!=undefined)
                return hotel.image =imageName.substring(imageName.lastIndexOf('\\')+1,imageName.length);
              })
              this.hotelList = data;
              this.hotelList.forEach(hotel => {
                  this.addHotel(hotel);
              });


            }
            , error =>{});
  }

  onclick(i){

    this.router.navigate(['/list/foodItems'],{queryParams:{page:this.hotelArray.value[i]._id}});
}
  deleteHotel(i){
    // this.router.navigate(['/list/foodItems'],{queryParams:{page:hotel._id}});


    this.service.deleteHotel(this.hotelArray.value[i]).subscribe(data =>
      {
          // if(data.deletedCount>0)
          //   {
              this.getHotel();

      });
  }
  updateHotel(i){

    this.service.updateHotel(this.hotelArray.value[i]).subscribe(data =>
      {
          // if(data.deletedCount>0)
          //   {
              this.getHotel();

      });
  }
}
