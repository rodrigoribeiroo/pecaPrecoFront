import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the UploadHistoricoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-upload-historico',
  templateUrl: 'upload-historico.html',
})
export class UploadHistoricoPage {
  arquivo:File;
  arquivo2:File;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadHistoricoPage');
  }

  upload() {
    console.log(this.arquivo.name);
    console.log(this.arquivo2.name);
  }

}
