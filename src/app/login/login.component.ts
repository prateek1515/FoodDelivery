import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

import {CommonService} from './../common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private LoginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,private router: Router,private _route: ActivatedRoute,private service:CommonService ) {
   }

  ngOnInit() {
    this.LoginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required]),
      pass:new FormControl('',[Validators.required])

    });

  }

  findUser()
  {
    this.service.finduser(this.LoginForm.value).subscribe(data =>
      {
        // if(data){
        // alert("login sucessfull")
        // }
        // else{
        //   alert("email does not exist")
        // // }
        if(data.result==false){

          alert("Invalid Login Details")
        }
        else{
          console.log(data.result[0]._id)
          this.service.saveid(data.result[0]._id)
          this.router.navigate(['/user'],{queryParams:{id:data.result[0]._id}})
        }

      }
      , error =>{});
    }
}
