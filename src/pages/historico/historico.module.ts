import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HistoricoPage } from './historico';
import { HTTP } from '@ionic-native/http';

@NgModule({
  declarations: [
    HistoricoPage,
  ],
  imports: [
    IonicPageModule.forChild(HistoricoPage),
  ],
  providers: [HTTP]
})
export class HistoricoPageModule {}
