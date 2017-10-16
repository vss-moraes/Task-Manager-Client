import { Component, OnInit } from '@angular/core';

import { FormControl } from '@angular/forms';

import { TarefaService } from '../tarefa/tarefa.service';

@Component({
  selector: 'app-adicionar-tarefas',
  templateUrl: './adicionar-tarefas.component.html',
  styleUrls: ['./adicionar-tarefas.component.css']
})
export class AdicionarTarefasComponent implements OnInit {

  tarefas = [];
  valor_severidade = [
    {valor: 0, conteudo: 'Baixa'},
    {valor: 1, conteudo: 'Média'},
    {valor: 2, conteudo: 'Alta'},
    {valor: 3, conteudo: 'Urgente'},    
  ];

  constructor(private tarefaService: TarefaService) { }

  ngOnInit() {
    this.consultar();
  }

  consultar() {
    this.tarefaService.listar().subscribe((dados) => {
      this.tarefas = dados;
    });
  }

  cadastrar(formulario: FormControl) {
    this.tarefaService.cadastrar(formulario.value).subscribe(() => {
      formulario.reset();
      this.consultar();
    })
  }

  remover(formulario, tarefa) {
    this.tarefaService.remover(tarefa._id).subscribe(() => {
      formulario.reset();
      this.consultar();
    });
  }
}
