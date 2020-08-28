import { Component, OnInit } from '@angular/core';
import {CommonService} from './../common.service';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  private signupform:FormGroup;
  constructor(private formbuilder:FormBuilder,private router: Router,private _route: ActivatedRoute,private service:CommonService) { }

  ngOnInit() {
    this.signupform=this.formbuilder.group({
      name:new FormControl('',[Validators.required]),
      email:new FormControl('',[Validators.required]),
      password:new FormControl('',[Validators.required]),
      confirm_pass:new FormControl('',[Validators.required])
    })
  }
  saveUser()
  {
    if(this.signupform.valid)
    {
      console.log('signup');
      this.service.saveUser(this.signupform.value).subscribe(data =>
        {
          console.log('saved uset');
          console.log(data);
          if(data.result==true){
            alert(data.result)
            this.router.navigate([''])
          }

            else{
              alert(data.result)
            }

        });
    }
    else{
      alert('invalid form');
    }

  }
}
