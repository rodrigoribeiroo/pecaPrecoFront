import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { BluetoothSerial } from ' @ ionic-native / bluetooth-serial ' ;

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { UsersProvider } from '../providers/users/users';



import { Geolocation } from '@ionic-native/geolocation';

//import { HttpModule } from '@angular/common/http';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    //HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Geolocation ,
    BluetoothSerial,
    UsersProvider
  ]
})
export class AppModule {}
