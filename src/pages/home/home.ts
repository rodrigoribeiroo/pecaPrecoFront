import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public loja: any;

  private config = {
    base: 'http://localhost:3000/api/',
    listaLojas: 'lerListaLojas',
    buscaLoja: 'buscarLojasPorNome'
  }


  searchQuery: string = '';
 


  constructor(public navCtrl: NavController, public http: HttpClient) {
    this.getLojas();
  }

  getLojas(){
    let data: Observable<any> = this.http.get(`${this.config.base}${this.config.listaLojas}?quant=30&index=0`);
    data.subscribe(result => {
        this.loja = result;
    })
}

  login() {
    this.navCtrl.push('LoginPage')
  }

}