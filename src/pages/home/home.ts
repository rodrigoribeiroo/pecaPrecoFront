import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HTTP } from '@ionic-native/http';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public lojas;

  private config = {
    base: 'http://localhost:3000/api/',
    listaLojas: 'lerListaLojas',
    buscaLoja: 'buscarLojasPorNome'
  }


  searchQuery: string = '';



  constructor(public navCtrl: NavController, public http: HttpClient, private httptest: HTTP) {
    this.getLojas();
  }

  getLojas() {
    this.httptest.get(`${this.config.base}${this.config.listaLojas}?quant=30&index=0`, {}, {})
      .then(data => {

        console.log(data.status);
        console.log(data.data);
        let json = JSON.parse(data.data);
        this.lojas = json.lojas; // data received by server

      })
      .catch(error => {

        console.log(error.status);
        console.log(error.error); // error message as string
        console.log(error.headers);

      });
  }

  getLoja() {
    this.httptest.get(`${this.config.base}${this.config.buscaLoja}?nome=${event}`, {}, {})
      .then(data => {

        console.log(data.status);
        console.log(data.data);
        let json = JSON.parse(data.data);
        this.lojas = json.lojas; // data received by server

      })
      .catch(error => {

        console.log(error.status);
        console.log(error.error); // error message as string
        console.log(error.headers);

      });
  }

  login() {
    this.navCtrl.push('LoginPage')
  }

}