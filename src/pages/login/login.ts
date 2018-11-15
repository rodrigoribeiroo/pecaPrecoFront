import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { UsersProvider } from './../../providers/users/users';

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
  model: User;

  constructor(
    public navCtrl: NavController, public navParams: NavParams, 
    private toast: ToastController, private userProvider: UsersProvider/*, public menu: MenuController*/) {
      this.model = new User();
      this.model.email = "peter@klaven";
      this.model.password = "cityslicka";
  }


  login(){
      this.userProvider.login(this.model.email, this.model.password)
      .then((result: any) => {
         localStorage.setItem("token", result.token);
         this.navCtrl.setRoot('CategoriasPage')
      })
      .catch((error: any) => {
         this.toast.create({ message: 'e-mail ou senha inválidos', position: 'botton', duration: 3000 }).present();
      })
  }
 
  //ionViewWillEnter() {     
  //  this.menu.swipeEnable(false);   
  //} 

 // ionViewDidLeave() {     
 //   this.menu.swipeEnable(true);   
 // }


  ionViewDidLoad() {
    const isUserLogged = () => localStorage.getItem("token");
    isUserLogged ? this.navCtrl.push('CategoriasPage') : null
  }

  cadastrar(){
    this.navCtrl.push('CadastroPage')
  }

}

export class User{
  email: string;
  password: string;
}
