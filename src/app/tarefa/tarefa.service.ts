import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TarefaService {
    urlServicos = 'http://localhost:3000/tarefas';

    constructor(private http: HttpClient) { }

    listar() {
        return this.http.get<any[]>(this.urlServicos);
    }

    cadastrar(tarefa: any) {
        console.log(tarefa);
        return this.http.post(this.urlServicos, tarefa);
    }

    remover(id: any) {
        return this.http.delete(this.urlServicos + '/' + id);
    }

    atualizar(id: any, tarefa: any) {
        return this.http.put(this.urlServicos + '/' + id, tarefa);
    }
}