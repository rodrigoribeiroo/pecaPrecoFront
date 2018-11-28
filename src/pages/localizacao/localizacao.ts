import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { HTTP } from '@ionic-native/http';
import * as tomtom from '../../tomtomsdk/tomtom.min.js';
import { NavController, NavParams } from 'ionic-angular';



/**
 * Generated class for the LocalizacaoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-localizacao',
  templateUrl: 'localizacao.html',
})
export class LocalizacaoPage {
  public lojas: JSON;
  public position;

  searchQuery: string = '';

  public idLoja;
  public lojaUnica;

  public busca: Array<any> = [];

  private config = {
    base: 'http://localhost:3000/api/',
    listaLojas: 'lerListaLojas',
    buscaLoja: 'buscarLojasPorNome',
    lerLoja: 'lerLojaPorId'
  }
  map: any;

  constructor(private httptest: HTTP, public navParams: NavParams) {
    this.idLoja = navParams.get('id');
  }

  ionViewDidLoad() {
    this.map = tomtom.L.map('map', {
      key: '1fnl9qjZpWFy9QbLghdLwTfsIrRATuMg',
      basePath: '../../tomtomsdk',
      center: [-22.789394, -43.306640],
      zoom: 15,
      trafficFlow: true
    });

    if (typeof this.idLoja == 'undefined') {
      this.getLojas();
    } else {
      this.lerLoja();
      tomtom.L.setView([this.lojaUnica.latitude, this.lojaUnica.longitude]);

    }
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
      var i = 0;
      var loja;
      for (loja in this.lojas) {
        console.log("colocando marker!");
        var marker = tomtom.L.marker([loja.latitude, loja.longitude]).addTo(this.map);
        var texto = loja.nome + "<br>Serviços:";

        var servico;
        for (servico in loja) {
          if (servico.preco == null) {
            texto = texto + "<br>" + servico.nome + " - Preço à combinar";
          }
          texto = texto + "<br>" + servico.nome + " - R$: " + servico.preco;
        }
        marker.bindPopup(texto);
      }
  }

  lerLoja() {
    this.httptest.get(`${this.config.base}${this.config.lerLoja}?lojaId=${this.idLoja}`, {}, {})
      .then(data => {

        console.log(data.status);
        console.log(data.data);
        let json = JSON.parse(data.data);
        this.lojaUnica = json.loja; // data received by server

      })
      .catch(error => {

        console.log(error.status);
        console.log(error.error); // error message as string
        console.log(error.headers);

      });

      console.log("colocando marker!");
      var marker = tomtom.L.marker([this.lojaUnica.latitude, this.lojaUnica.longitude]).addTo(this.map);
      var texto = this.lojaUnica.nome + "<br>Serviços:";

      var servico: any;
      for (servico in this.lojaUnica) {
        if (servico.preco == null) {
          texto = texto + "<br>" + servico.nome + " - Preço à combinar";
        }
        texto = texto + "<br>" + servico.nome + " - R$: " + servico.preco;
      }
      marker.bindPopup(texto);
  }

  getLoja() {
    this.searchQuery.trim();
    if (this.searchQuery == "") {
      this.busca = [];
      return;
    } else {
      this.httptest.get(`${this.config.base}${this.config.buscaLoja}?nome=${this.searchQuery}`, {}, {})
        .then(data => {

          console.log(data.status);
          console.log(data.data);
          let json = JSON.parse(data.data);
          this.busca = json.resultados; // data received by server

        })
        .catch(error => {

          console.log(error.status);
          console.log(error.error); // error message as string
          console.log(error.headers);

        });
    }
  }

  verLojaEnter(event) {
    if (this.busca.length == 1) {
      this.verLoja[this.busca[1].pk_id_loja];
    }
  }

  verLoja(id: Number) {

  }
}