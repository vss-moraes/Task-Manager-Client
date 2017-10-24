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

  verificarDatas(){
    let today = new Date()
    let str = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()    
    this.tarefas.forEach(tarefa => {
      if (tarefa.deadline == str){
        this.criarPushNotification(tarefa.descricao, "Termina hoje!");
      } else {
        console.log(tarefa.deadline);
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