import { Component, OnInit } from '@angular/core';

import { FormControl } from '@angular/forms';

import { TarefaService } from '../tarefa/tarefa.service';

@Component({
  selector: 'app-adicionar-tarefas',
  templateUrl: './adicionar-tarefas.component.html',
  styleUrls: ['./adicionar-tarefas.component.css']
})
export class AdicionarTarefasComponent implements OnInit {

  constructor(private tarefaService: TarefaService) { }

  ngOnInit() {
  }

  cadastrar(formulario: FormControl) {
    this.tarefaService.cadastrar(formulario.value).subscribe(() => {
      formulario.reset();
    })
  }
}
