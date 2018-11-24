import { IonicPageModule } from 'ionic-angular/module'; 
import { NgModule } from '@angular/core';  
import { HomePage } from './home'; 
import { HTTP } from '@ionic-native/http';
 
@NgModule({
    declarations: [HomePage],     
    imports: [IonicPageModule.forChild(HomePage)],
    providers: [HTTP]
}) 
export class HomeModule { 
} 
