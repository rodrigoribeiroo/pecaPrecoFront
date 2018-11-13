import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { MenuController } from 'ionic-angular/components/app/menu-controller';
import { UsersProvider } from './../../providers/users/users';

/**
 * Generated class for the CadastroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {
  model: User;

  constructor(
    public navCtrl: NavController, public navParams: NavParams, public menu: MenuController,
    private toast: ToastController, private userProvider: UsersProvider) {
      this.model = new User();
      this.model.email = "sydney@fife";
      this.model.password = "pistol";
  }

 createAccount(){
   this.userProvider.createAccount(this.model.email, this.model.password)
   .then((result: any) => {
      this.navCtrl.setRoot('CategoriasPage')
   })
   .catch((error: any) => {
      this.navCtrl.setRoot('CadastroPage')
   })
 }

  
}

export class User{
    email: string;
    password: string;
}
