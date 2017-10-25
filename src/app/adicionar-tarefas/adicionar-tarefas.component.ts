import { Component, OnInit } from '@angular/core';

import { FormControl } from '@angular/forms';

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
  valor_severidade = [
    {valor: 0, conteudo: 'Baixa'},
    {valor: 1, conteudo: 'Média'},
    {valor: 2, conteudo: 'Alta'},
    {valor: 3, conteudo: 'Urgente'},    
  ]; 

  constructor(private tarefaService: TarefaService,
              private dialogsService: DialogsService,
              private _push: PushNotificationsService) { }

  ngOnInit() {
    this.consultar();
    this._push.requestPermission();
  }

  criarPushNotification(title, body){
    this._push.create(title, {body: body}).subscribe(
      res => console.log(res),
      err => console.log(err)
    );
  }

  comparaDatas(data){
    data = data.split("-"); //ano-mes-dia
    console.log(data);
    let hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    console.log(hoje.getFullYear(), hoje.getMonth(), hoje.getDate());
    if (hoje.getFullYear() == data[0]){
      if (hoje.getMonth() + 1 == data[1]){
        if (hoje.getDate() == data[2]){
          return 0; // É hoje
        } else if (hoje.getDate() < data[2]){
          return 1; // No prazo
        } else {
          return -1; // Atrasado
        }
      } else if (hoje.getMonth() + 1  < data[1]){
        return 1;
      } else {
        return -1;
      }
    } else if (hoje.getFullYear() < data[0]){
      return 1;
    } else {
      return -1;
    }
  }

  verificarDatas(){  
    this.tarefas.forEach(tarefa => {
      if (this.comparaDatas(tarefa.deadline) == 0){
        this.criarPushNotification(tarefa.descricao, "Termina hoje!");
      } else if (this.comparaDatas(tarefa.deadline) == -1){
        this.criarPushNotification(tarefa.descricao, "ATRASADA!");
      } else {
        console.log(tarefa.descricao + "DATA: " + new Date(tarefa.deadline));
      }
    });
  }

  consultar() {
    this.tarefaService.listar().subscribe((dados) => {
      this.tarefas = dados;
      this.verificarDatas();
    });
  }

  cadastrar(formulario: FormControl) {
    this.tarefaService.cadastrar(formulario.value).subscribe(() => {
      formulario.reset();
      this.consultar();
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

  deleteDialog(title, message, _id) {
    this.dialogsService
      .confirm(title, message)
      .subscribe(result => {
        if (result){
          this.remover(_id);
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
      }
    });
  }
}