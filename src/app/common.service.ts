import { Injectable } from '@angular/core';
import { Response, Headers, RequestOptions, Http } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { concat } from 'rxjs/internal/observable/concat';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/do';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: Http) { }

  cart:any = [];
  id:string;

  saveUser(user){

    return this.http.post("http://localhost:8080/api/SaveUser", user).pipe(map((response: any) => response.json()))

  }
  finduser(user){
    return this.http.post("http://localhost:8080/api/findUser", user).pipe(map((response: any) => response.json()))

  }
  saveRestuarant(user){
    return this.http.post("http://localhost:8080/api/saveRestuarent", user).pipe(map((response: any) => response.json()))
  }
  findRestuarant(){
    return this.http.get("http://localhost:8080/api/findRestuarent").pipe(map((response: any) => response.json()))
  }
  getDish(id){
    return this.http.post("http://localhost:8080/api/getDish",id).pipe(map((response: any) => response.json()))
  }
  createDish(user){
    return this.http.post("http://localhost:8080/api/createDish",user).pipe(map((response: any) => response.json()))
  }
  deleteHotel(hotel){
    return this.http.post("http://localhost:8080/api/deleteHotel",hotel).pipe(map((response: any) => response.json()))
  }
  updateHotel(hotel){
    return this.http.post("http://localhost:8080/api/updateHotel",hotel).pipe(map((response: any) => response.json()))
  }
  deleteDish(dish){

    return this.http.post("http://localhost:8080/api/deleteDish",dish).pipe(map((response: any) => response.json()))
  }
  cartItems(order){
    this.cart = order;
  }


  getCartItems()
  {
    return this.cart;
  }
  placeOrders(orders){
        return this.http.post("http://localhost:8080/api/placeOrders",orders).pipe(map((response: any) => response.json()))
      }
    saveid(userid){
    this.id=userid
    }
    getid(){
      return this.id
    }
    findOrder(orderId){
              return this.http.post("http://localhost:8080/api/findOrders",orderId).pipe(map((response: any) => response.json()))
            }
    getRes(orderId){
              return this.http.post("http://localhost:8080/api/getRes",orderId).pipe(map((response: any) => response.json()))
            }
}
