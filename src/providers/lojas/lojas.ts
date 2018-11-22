import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LojasProvider {

  private config = {
    base: 'https://localhost:3000/api/',
    listaLojas: 'lerListaLojas',
    buscaLoja: 'buscarLojasPorNome'
  }

  constructor(public http: HttpClient) { 
      this.getLojas();
  }

getLojas(){
    let data: Observable<any> = this.http.get(`${this.config.base}${this.config.listaLojas}`);
    data.subscribe(result => {
        console.log(result)
    })
}

}
