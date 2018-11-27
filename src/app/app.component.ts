import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: string = 'HomePage';
  pageAlertas: String = 'AlertasPage';
  pageLocalizacao: String = 'LocalicaoPage'
  

  pages: Array<{title: string, component: string}>;

  constructor(public platform: Platform, public statusBar: StatusBar) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Alertas', component: 'AlertasPage' },
      { title: 'Mapa de Lojas', component: 'LocalizacaoPage' },
      { title: 'Sair', component: 'HomePage' }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if (page.title=='Sair'){
      this.nav.setRoot('HomePage');
      localStorage.removeItem("token");
    }
    else {
      this.nav.push(page.component);
    }
  }
}
