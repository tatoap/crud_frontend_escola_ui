import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { MessageService } from 'primeng/api';

import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Aluno } from 'src/app/core/model';
import { AlunoService } from '../aluno.service';

@Component({
  selector: 'app-aluno-cadastro',
  templateUrl: './aluno-cadastro.component.html',
  styleUrls: ['./aluno-cadastro.component.css']
})
export class AlunoCadastroComponent implements OnInit {

  aluno = new Aluno();
  estados: any[];
  cidades: any[];
  estadoSelecionado: number;

  constructor(private alunoService: AlunoService,
              private messageService: MessageService,
              private errorHandler: ErrorHandlerService,
              private route: ActivatedRoute,
              private router: Router,
              private title: Title,
  ) {}

  ngOnInit(): void {

    const idAluno = this.route.snapshot.params['id'];

    this.title.setTitle('Novo Aluno');

    if (idAluno) {
      this.carregarAluno(idAluno);
    }

    this.carregarEstados();

  }

  carregarEstados() {
    this.alunoService.listarEstados()
      .then(lista => {
        this.estados = lista.map(uf => ({ label: uf.nome, value: uf.id }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarCidades() {
    console.log(this.estadoSelecionado);
    this.alunoService.pesquisarCidades(this.estadoSelecionado).then(lista => {
      this.cidades = lista.map(c => ({ label: c.nome, value: c.id }));
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  get editando(){
    return Boolean(this.aluno.id);
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarAluno(form);
    } else {
      this.adicionarAluno(form);
    }
  }

  adicionarAluno(form: FormControl) {
    console.log(this.aluno);
    this.alunoService.adicionar(this.aluno)
      .then(alunoAdicionado => {
        this.messageService.add({ severity: 'success', detail: 'Aluno adicionado com sucesso!' });

        this.router.navigate(['/alunos', alunoAdicionado.id]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarAluno(form: FormControl) {
    this.alunoService.atualizar(this.aluno)
      .then(aluno => {
        this.aluno = aluno;

        this.atualizarTituloEdicao();
        this.messageService.add({ severity: 'success', detail: 'Aluno atualizado com sucesso!' });
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarAluno(id: number) {
    return this.alunoService.buscarPorId(id)
      .then(aluno => {
        this.aluno = aluno;

        this.estadoSelecionado = (this.aluno.endereco.cidade) ?
          this.aluno.endereco.cidade.estado.id : null;

        if (this.estadoSelecionado) {
          this.carregarCidades();
        }

        console.log(this.aluno.endereco.cep);

        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  novo(form: FormControl) {
    form.reset(new Aluno());

    this.router.navigate(['/alunos/novo']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de aluno: ${this.aluno.nome}`);
  }

}
