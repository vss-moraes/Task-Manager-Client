import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';

import { PushNotificationsModule } from 'angular2-notifications';

import { MaterialModule } from './material.module';


import { AppComponent } from './app.component';
import { AdicionarTarefasComponent } from './adicionar-tarefas/adicionar-tarefas.component';

import { TarefaService } from './tarefa/tarefa.service';

@NgModule({
  declarations: [
    AppComponent,
    AdicionarTarefasComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    PushNotificationsModule
  ],
  providers: [TarefaService],
  bootstrap: [AppComponent]
})

export class AppModule { }
