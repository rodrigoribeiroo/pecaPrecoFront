import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { BluetoothSerial} from '@ionic-native/bluetooth-serial';
import {AlertController} from 'ionic-angular';

import { HTTP } from '@ionic-native/http';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public lojas;
  public buscaServico;
  public busca;

  private config = {
    base: 'http://localhost:3000/api/',
    listaLojas: 'lerListaLojas',
    buscaLoja: 'buscarLojasPorNome',
    buscarLojasCompletas: 'buscarLojasCompletasPorNome',
    listaServicos: 'buscarServicosPorNome'
  }


  searchQuery: string = '';
  searchQueryServico: string = '';



  constructor(public navCtrl: NavController, public http: HttpClient, private httptest: HTTP,private bluetoothSerial: BluetoothSerial, private alertCtrl: AlertController) {
    bluetoothSerial.enable(); 
    this.getLojas();
  }

  getLojas() {
    this.busca = [];
    if(this.searchQuery == "") {
      this.httptest.get(`${this.config.base}${this.config.listaLojas}?quant=30&index=0`, {}, {})
        .then(data => {

          console.log(data.status);
          //console.log(data.data);
          let json = JSON.parse(data.data);
          this.lojas = json.lojas; // data received by server
          this.busca = [];

        })
        .catch(error => {

          console.log(error.status);
          console.log(error.error); // error message as string
          console.log(error.headers);

        });
    } else {
      this.httptest.get(`${this.config.base}${this.config.buscarLojasCompletas}?quant=30&index=0&nome=${this.searchQuery}`, {}, {})
        .then(data => {

          console.log(data.status);
          //console.log(data.data);
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

  getServicos() {
    this.busca = [];
    if(this.searchQueryServico != "") {
      this.httptest.get(`${this.config.base}${this.config.listaServicos}?nome=${this.searchQueryServico}`, {}, {})
        .then(data => {

          console.log(data.status);
          //console.log(data.data);
          let json = JSON.parse(data.data);
          this.buscaServico = json.servicos; // data received by server
        })
        .catch(error => {

          console.log(error.status);
          console.log(error.error); // error message as string
          console.log(error.headers);

        });
    } else {
      this.httptest.get(`${this.config.base}${this.config.listaServicos}?nome= `, {}, {})
        .then(data => {

          console.log(data.status);
          //console.log(data.data);
          let json = JSON.parse(data.data);
          this.buscaServico = json.servicos; // data received by server

        })
        .catch(error => {

          console.log(error.status);
          console.log(error.error); // error message as string
          console.log(error.headers);

        });
    }
  }

  getLoja() {
    this.searchQuery.trim();
    if(this.searchQuery == ""){
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

  login() {
    this.navCtrl.push('LoginPage')
  }

  upload() {
    this.navCtrl.push('UploadHistoricoPage')
  }
  unpairedDevices: any;
  pairedDevices: any;
  gettingDevices: Boolean;
  
  startScanning() {
    this.pairedDevices = null;
    this.unpairedDevices = null;
    this.gettingDevices = true;
    this.bluetoothSerial.discoverUnpaired().then((success) => {
      this.unpairedDevices = success;
      this.gettingDevices = false;
      success.forEach(element => {
        // alert(element.name);
      });
    },
      (err) => {
        console.log(err);
      })

    this.bluetoothSerial.list().then((success) => {
      this.pairedDevices = success;
    },
      (err) => {

      })
  }
  success = (data) => alert(data);
  fail = (error) => alert(error);

  selectDevice(address: any) {

    let alert = this.alertCtrl.create({
      title: 'Connect',
      message: 'Você quer se conectar?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Connect',
          handler: () => {
            this.bluetoothSerial.connect(address).subscribe(this.success, this.fail);
          }
        }
      ]
    });
    alert.present();

  }

  disconnect() {
    let alert = this.alertCtrl.create({
      title: 'Disconnect?',
      message: 'Deseja Desconectar?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Disconnect',
          handler: () => {
            this.bluetoothSerial.disconnect();
          }
        }
      ]
    });
    alert.present();
  }
  
  verLoja(id:Number){
    //this.navctrl.push('LojaPage') com parametro id sei lá como
  }

}
