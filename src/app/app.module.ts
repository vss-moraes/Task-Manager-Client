import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material.module';

import { AppComponent } from './app.component';
import { AdicionarTarefasComponent } from './adicionar-tarefas/adicionar-tarefas.component';
import { ListaTarefasComponent } from './lista-tarefas/lista-tarefas.component';

import { TarefaService } from './tarefa/tarefa.service';

@NgModule({
  declarations: [
    AppComponent,
    AdicionarTarefasComponent,
    ListaTarefasComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [TarefaService],
  bootstrap: [AppComponent]
})

export class AppModule { }
