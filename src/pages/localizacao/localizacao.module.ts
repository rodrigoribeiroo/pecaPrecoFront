import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LocalizacaoPage } from './localizacao';
import { HTTP } from '@ionic-native/http';


@NgModule({
  declarations: [
    LocalizacaoPage,
  
  ],
  imports: [
    IonicPageModule.forChild(LocalizacaoPage),
  
  ],
  providers: [HTTP]
})
export class LocalizacaoPageModule {}
