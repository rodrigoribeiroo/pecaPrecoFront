import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams/*, public menu: MenuController*/) {
  }
  
  //ionViewWillEnter() {     
  //  this.menu.swipeEnable(false);   
  //} 

 // ionViewDidLeave() {     
 //   this.menu.swipeEnable(true);   
 // }


  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    this.navCtrl.setRoot('CategoriasPage')
  }

  cadastrar(){
    this.navCtrl.push('CadastroPage')
  }

}
