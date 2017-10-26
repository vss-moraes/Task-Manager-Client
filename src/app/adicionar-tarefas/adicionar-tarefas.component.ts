import { Component, OnInit } from '@angular/core';

import { FormControl } from '@angular/forms';

import {MatSnackBar} from '@angular/material';

import { TarefaService } from '../tarefa/tarefa.service';
import { DialogsService } from '../custom-dialog/custom-dialog.service';
import { PushNotificationsService } from 'angular2-notifications';


@Component({
  selector: 'app-adicionar-tarefas',
  templateUrl: './adicionar-tarefas.component.html',
  styleUrls: ['./adicionar-tarefas.component.css']
})
export class AdicionarTarefasComponent implements OnInit {

  public result: any;
  tarefas = [];
  reload = true;
  valor_severidade = [
    {valor: 0, conteudo: 'Baixa'},
    {valor: 1, conteudo: 'Média'},
    {valor: 2, conteudo: 'Alta'},
    {valor: 3, conteudo: 'Urgente'},    
  ]; 

  constructor(private tarefaService: TarefaService,
              private dialogsService: DialogsService,
              private _push: PushNotificationsService,
              public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.consultar();
    this._push.requestPermission();
  }

  criarPushNotification(title, body, icone){
    let notificacao = this._push.create(title, 
    {
      body: body,
      icon: icone,
    }).subscribe(
      res => console.log(res),
      err => console.log(err)
    );
  }

  comparaDatas(data){
    data = data.split("-"); //ano-mes-dia
    let hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    if (hoje.getFullYear() == data[0]){
      if (hoje.getMonth() + 1 == data[1]){
        if (hoje.getDate() == data[2]){
          return "hoje"; // É hoje
        } else if (hoje.getDate() < data[2]){
          return "ok"; // No prazo
        } else {
          return "atraso"; // Atrasado
        }
      } else if (hoje.getMonth() + 1  < data[1]){
        return "ok";
      } else {
        return "atraso";
      }
    } else if (hoje.getFullYear() < data[0]){
      return "ok";
    } else {
      return "atraso";
    }
  }

  verificarDatas(){  
    this.tarefas.forEach(tarefa => {
      if (this.comparaDatas(tarefa.deadline) == "hoje"){
        this.criarPushNotification(tarefa.descricao, "Termina hoje!", "https://cdn0.iconfinder.com/data/icons/social-messaging-ui-color-shapes/128/alert-triangle-yellow-512.png");
      } else if (this.comparaDatas(tarefa.deadline) == "atraso"){
        this.criarPushNotification(tarefa.descricao, "ATRASADA!", "https://cdn3.iconfinder.com/data/icons/picons-weather/57/53_warning-512.png");
      } else {
        console.log(tarefa.descricao + "DATA: " + new Date(tarefa.deadline));
      }
      this.reload = false;
    });
  }

  consultar() {
    this.tarefaService.listar().subscribe((dados) => {
      this.tarefas = dados;
      if (this.reload)
        this.verificarDatas();
    });
  }

  cadastrar(formulario: FormControl) {
    this.tarefaService.cadastrar(formulario.value).subscribe(() => {
      this.consultar();
      formulario.reset();
    })
  }

  remover(id) {
    console.log(id);
    this.tarefaService.remover(id).subscribe(() => {
      this.consultar();
    });
  }

  atualizar(id, tarefa) {
    this.tarefaService.atualizar(id, tarefa).subscribe(() => {
      this.consultar();
    })
  }

  deleteDialog(title, message, tarefa) {
    this.dialogsService
      .confirm(title, message)
      .subscribe(result => {
        if (result){
          this.remover(tarefa.id);
          this.abrirSnackBar("Tarefa " + tarefa.descricao + " deletada.");
        }
      });
  }

  concluidoDialog(title, message, tarefa){
    this.dialogsService
    .confirm(title, message)
    .subscribe(result => {
      if (result){
        tarefa.realizada = 1;
        this.atualizar(tarefa.id, tarefa);
        this.abrirSnackBar("Tarefa " + tarefa.descricao + " finalizada.");        
      }
    });
  }

  abrirSnackBar(mensagem: string){
    this.snackBar.open(mensagem, "OK", {
      duration: 2000,
    });
  }
}