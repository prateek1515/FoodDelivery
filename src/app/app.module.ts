import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { FormGroup, FormControl } from '@angular/forms/src/model';
import { SignupComponent } from './signup/signup.component';
import {CommonService} from './common.service';
import { HttpModule } from '@angular/http';
import { AdminComponent } from './admin/admin.component';
import { ListComponent } from './list/list.component';
import { FoodItemsComponent } from './food-items/food-items.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { UserDishesComponent } from './user-dishes/user-dishes.component';
import { CartComponent } from './cart/cart.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SignupComponent,
    AdminComponent,
    ListComponent,
    FoodItemsComponent,
    UserHomeComponent,
    UserDishesComponent,
    CartComponent,
    MyOrdersComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(
      [
        {path: '', redirectTo: '/home/login', pathMatch: 'full'},
        {path: 'home', component: HomeComponent,
        children: [{ path: 'login', component: LoginComponent}, { path: 'signup', component: SignupComponent}]},
        {path: 'list/admin', component:AdminComponent, pathMatch: 'full'},
        {path: 'list', component:ListComponent,pathMatch:'full'},
        {path: 'list/foodItems', component:FoodItemsComponent, pathMatch: 'full'},
        {path:'user',component:UserHomeComponent,pathMatch:'full'},
        {path:'user/dishes',component:UserDishesComponent,pathMatch:'full'},
        {path:'user/dishes/cart',component:CartComponent,pathMatch:'full'},
        {path:'user/myOrders',component:MyOrdersComponent,pathMatch:'full'}
      ]
    ),
    HttpModule
  ],
  providers: [CommonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
