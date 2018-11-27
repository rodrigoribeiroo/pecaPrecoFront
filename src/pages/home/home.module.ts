import { IonicPageModule } from 'ionic-angular/module'; 
import { NgModule } from '@angular/core';  
import { HomePage } from './home'; 
import { HTTP } from '@ionic-native/http';
import { PipesModule  } from '../../pipes/pipes.module';

 
@NgModule({
    declarations: [HomePage],     
    imports: [IonicPageModule.forChild(HomePage), PipesModule],
    providers: [HTTP]
}) 
export class HomeModule { 
} 
