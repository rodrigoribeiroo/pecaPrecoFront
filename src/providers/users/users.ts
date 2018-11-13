import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class UsersProvider {
  private API_URL = 'https://reqres.in/api/'

  constructor(public http: HttpClient) { }

  createAccount(email: String, password: String){
    return new Promise((resolve, reject) => {
      var data = {
        email: email,
        password: password
      }
      this.http.post(this.API_URL + 'register', data)
        .subscribe(result => {
          resolve(result);
        },
        (error) => {
          reject(error);
        })
    })
  }

  login(email: String, password: String){
    return new Promise((resolve, reject) => {
      var data = {
        email: email,
        password: password
      }
      this.http.post(this.API_URL + 'login', data)
      .subscribe(result => {
        resolve(result);
      },
      (error) => {
        reject(error);
        })
    })
  }

  getAll(page: number){
    return new Promise((resolve, reject) => {
      
      let url = this.API_URL + 'users?per_page=10&page=' + page;

      this.http.get(url)
      .subscribe(result => {
        resolve(result);
      },
      (error) => {
        reject(error);
        })
    })
  }

  get(id: number){
    return new Promise((resolve, reject) => {
      
      let url = this.API_URL + 'users/' + id;

      this.http.get(url)
      .subscribe(result => {
        resolve(result);
      },
      (error) => {
        reject(error);
        })
    })
  }

  insert(user: any){
    return new Promise((resolve, reject) => {
      
      let url = this.API_URL + 'users';

      this.http.post(url, user)
      .subscribe(result => {
        resolve(result);
      },
      (error) => {
        reject(error);
        })
    })
  }

  update(user: any){
    return new Promise((resolve, reject) => {
      
      let url = this.API_URL + 'users/' + user.id;
      let data = {
        "first_name": user.first_name,
        "last_name": user.last_name
      }

      this.http.put(url, data)
      .subscribe(result => {
        resolve(result);
      },
      (error) => {
        reject(error);
        })
    })
  }

  remove(id: number){
    return new Promise((resolve, reject) => {
      
      let url = this.API_URL + 'users/' + id;

      this.http.delete(url)
      .subscribe(result => {
        resolve(result);
      },
      (error) => {
        reject(error);
        })
    })
  }


    
}
