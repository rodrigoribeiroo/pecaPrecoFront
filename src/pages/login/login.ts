import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { UsersProvider } from './../../providers/users/users';
import { HTTP } from '@ionic-native/http';

//import { MenuController } from 'ionic-angular/components/app/menu-controller';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  private config = {
    base: 'http://localhost:3000/api/',
    login: 'login',
  }

  model: User;

  constructor(
    public navCtrl: NavController, public navParams: NavParams, 
    private toast: ToastController, private userProvider: UsersProvider, /*public menu: MenuController*/
    private httptest: HTTP) {
      this.model = new User();
      /*this.model.email = "peter@klaven";
      this.model.password = "cityslicka";*/
  }


  login(){
    this.httptest.post(`${this.config.base}${this.config.login}`, {"email":`${this.model.email}`, "senha":`${this.model.password}`}, {})
    .then(data => {
      console.log(data.status);
      console.log(data.data);
      let json = JSON.parse(data.data);
      console.log(json.token);
      localStorage.setItem("token", json.token); // data received by server
      this.navCtrl.setRoot('PrincipalPage');
    })
    .catch(error => {

      console.log(error.status);
      console.log(error.error); // error message as string
      console.log(error.headers);

      this.toast.create({ message: error.error, position: 'botton', duration: 3000 }).present();
    });
  }
 
  //ionViewWillEnter() {     
  //  this.menu.swipeEnable(false);   
  //} 

 // ionViewDidLeave() {     
 //   this.menu.swipeEnable(true);   
 // }


  ionViewDidLoad() {
    var token = localStorage.getItem("token");
    const isUserLogged = (token != null && typeof token != 'undefined' && token != "");
    console.log(token);
    if(isUserLogged){
      this.navCtrl.setRoot('PrincipalPage')
    }
  }

  cadastrar(){
    this.navCtrl.push('CadastroPage')
  }

}

export class User{
  email: string;
  password: string;
}
