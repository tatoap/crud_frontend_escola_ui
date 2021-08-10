import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

import { MessageService } from 'primeng/api';

import { Aluno } from 'src/app/core/model';

import { AlunoService } from 'src/app/alunos/aluno.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-turma-cadastro-aluno',
  templateUrl: './turma-cadastro-aluno.component.html',
  styleUrls: ['./turma-cadastro-aluno.component.css']
})
export class TurmaCadastroAlunoComponent implements OnInit {

  @Input() alunos: Array<Aluno>;
  aluno: Aluno;
  exibindoFormularioAluno = false;
  alunoIndex: number;
  alunosDialog = [];
  alunoSelecionado: number;
  idade: number;
  telefone: string;

  constructor(
            private alunoService: AlunoService,
            private errorHandler: ErrorHandlerService,
            private messageService: MessageService
  ) { }

  ngOnInit(): void {}

  carregarAlunos() {
    return this.alunoService.listarTodas()
      .then(alunos => {
        this.alunosDialog = alunos.map(p => ({ label: p.nome, value: p.id }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarDialogForm() {
    console.log(this.alunoSelecionado);

    this.alunoService.buscarPorId(this.alunoSelecionado)
      .then(aluno => {
        this.idade = aluno.idade;
        console.log(this.idade);
        this.telefone = aluno.telefone;
        console.log(this.telefone);
    })
  }

  prepararNovoAluno() {
    this.exibindoFormularioAluno = true;
    this.aluno = new Aluno();
    this.carregarAlunos();
    this.alunoIndex = this.alunos.length;
  }

  confirmarAluno(frm: FormControl) {
    for (var i = 0; i < this.alunos.length; i++) {
      var aluno = this.alunos[i];
      if (aluno.id === this.alunoSelecionado) {
        this.exibindoFormularioAluno = false;
        this.messageService.add({ severity: 'error', detail: 'Aluno(a) já inserido(a) na turma!' });
        return;
      }
    }
    this.alunoService.buscarPorId(this.alunoSelecionado)
      .then(aluno => {
        this.alunos[this.alunoIndex] = this.clonarAluno(aluno);
      });

    this.exibindoFormularioAluno = false;

    frm.reset();
  }

  removerAluno(index: number) {
    this.alunos.splice(index, 1);
  }

  clonarAluno(aluno: Aluno): Aluno {
    return new Aluno(aluno.id, aluno.nome, aluno.idade, aluno.telefone);
  }

  get editando() {
    return this.aluno && this.aluno.id;
  }

}
