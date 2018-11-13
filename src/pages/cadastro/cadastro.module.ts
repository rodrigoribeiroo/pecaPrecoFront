import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadastroPage } from './cadastro';
import { HttpClientModule } from '@angular/common/http';
import { UsersProvider } from '../../providers/users/users';

@NgModule({
  declarations: [
    CadastroPage,
  ],
  imports: [
    IonicPageModule.forChild(CadastroPage),
    HttpClientModule
  ],
  providers: [
    UsersProvider
  ],
})
export class CadastroPageModule {}
