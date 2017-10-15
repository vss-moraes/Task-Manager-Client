import { Component, OnInit } from '@angular/core';

import { TarefaService } from '../tarefa/tarefa.service';

@Component({
  selector: 'app-lista-tarefas',
  templateUrl: './lista-tarefas.component.html',
  styleUrls: ['./lista-tarefas.component.css']
})
export class ListaTarefasComponent implements OnInit {

  tarefas = [];

  constructor(private tarefaService: TarefaService) { }

  ngOnInit() {
    this.consultar();
  }

  consultar() {
    this.tarefaService.listar().subscribe((dados) => {
      this.tarefas = dados;
    });
  }

}
