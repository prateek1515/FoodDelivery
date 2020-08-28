import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import {CommonService} from './../common.service';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
@Component({
  selector: 'app-food-items',
  templateUrl: './food-items.component.html',
  styleUrls: ['./food-items.component.css']
})

export class FoodItemsComponent implements OnInit {
  private ItemList: FormGroup;
  private id;
  private items:any=[]
  constructor(private formBuilder: FormBuilder,private service:CommonService,private router: Router,private _route: ActivatedRoute ) { }

  ngOnInit() {
    this.id=this._route.snapshot.queryParams['page'];

this.getDish()
    this.ItemList = this.formBuilder.group({
      Name: new FormControl('', [Validators.required]),
      Image:new FormControl('',[Validators.required]),
      price: new FormControl('', [Validators.required]),
      restaurantId: new FormControl(this.id, [Validators.required]),

  });


  //this.ItemList.controls['restaurantId'].setValue(this.id);

  this.getDish();

  }

  // const id=this._route.snapshot.params['page'];
  // console.log(id);
  getDish(){
    this.service.getDish({'id':this.id}).subscribe((data:any) =>
      {
        data.map(items=>{
          var imageName:string = items.Image
          return items.Image =imageName.substring(imageName.lastIndexOf('\\')+1,imageName.length);
        })
        this.items=data

      }
      , error =>{});
    }
    createDish(){
      this.service.createDish(this.ItemList.value).subscribe(data =>
        {
          this.getDish();
          // this.router.navigate(['/list/foodItems'])
        }
        , error =>{});
      }
      deleteDish(item){

        this.service.deleteDish(item).subscribe(data =>
          {
            this.getDish();
            // this.router.navigate(['/list/foodItems'])
          }
          , error =>{});
      }
  }

