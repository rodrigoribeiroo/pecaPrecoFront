import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';

/**
 * Generated class for the HistoricoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-historico',
  templateUrl: 'historico.html',
})
export class HistoricoPage {
  public historicos;

  private config = {
    base: 'http://localhost:3000/api/',
    lerHistorico: 'lerListaHistorico'
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HTTP) {
    this.getHistorico();
  }

  getHistorico(){
    this.http.get(`${this.config.base}${this.config.lerHistorico}?id=2&quant=30&index=0`, {}, {})
    .then(data => {

      //console.log(data.status);
      console.log(data.data);
      let json = JSON.parse(data.data);
      this.historicos = json.historicos; // data received by server

    })
    .catch(error => {

      console.log(error.status);
      console.log(error.error); // error message as string
      console.log(error.headers);

    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoricoPage');
  }

}
