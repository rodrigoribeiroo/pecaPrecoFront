import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';

import {LocationService ,
   GoogleMap ,
   GoogleMapOptions ,
   MyLocation, 
   GoogleMaps
} from  '@ionic-native/google-maps' ;
import { from } from 'rxjs/observable/from';
import { HTTP } from '@ionic-native/http';

 


/**
 * Generated class for the LocalizacaoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google;


@IonicPage()
@Component({
  selector: 'page-localizacao',
  templateUrl: 'localizacao.html',
})
export class LocalizacaoPage {
  public lojas:JSON;
  public markers;

  private config = {
    base: 'http://localhost:3000/api/',
    listaLojas: 'lerListaLojas',
    buscaLoja: 'buscarLojasPorNome'
  }
  map: any;
 
  constructor(private geolocation: Geolocation, private httptest: HTTP) {this.getLojas()}
 
  ionViewDidLoad() {
    this.geolocation.getCurrentPosition()
      .then((resp) => {
        const position = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
 
        const mapOptions = {
          zoom: 18,
          center: position
        }
 
        this.map = new google.maps.Map(document.getElementById('map'), mapOptions);

        var i = 0;
        var loja:any;
        for(loja in this.lojas){
          this.markers[i] = new google.maps.Marker({
            position: new google.maps.LatLng(loja.latitude, loja.longitude),
            map: this.map
          });
        }
 
        const marker = new google.maps.Marker({
          position: position,
          map: this.map
        });
 
      }).catch((error) => {
        console.log('Erro ao recuperar sua posição', error);
      });
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
}