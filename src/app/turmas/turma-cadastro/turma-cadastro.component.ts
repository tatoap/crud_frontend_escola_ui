import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { MessageService } from 'primeng/api';

import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Turma } from 'src/app/core/model';
import { TurmaService } from '../turma.service';

@Component({
  selector: 'app-turma-cadastro',
  templateUrl: './turma-cadastro.component.html',
  styleUrls: ['./turma-cadastro.component.css']
})
export class TurmaCadastroComponent implements OnInit {

  turma = new Turma();

  constructor(private turmaService: TurmaService,
              private messageService: MessageService,
              private errorHandler: ErrorHandlerService,
              private route: ActivatedRoute,
              private router: Router,
              private title: Title
  ) {}

  ngOnInit(): void {
    const idTurma = this.route.snapshot.params['id'];

    this.title.setTitle('Nova Turma');

    if (idTurma) {
      this.carregarTurma(idTurma);
    }

  }

  get editando(){
    return Boolean(this.turma.id);
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarTurma(form);
    } else {
      this.adicionarTurma(form);
    }
  }

  adicionarTurma(form: FormControl) {
    console.log(this.turma);
    this.turmaService.adicionar(this.turma)
      .then(turmaAdicionada => {
        this.messageService.add({ severity: 'success', detail: 'Turma adicionada com sucesso!' });

        this.router.navigate(['/turmas', turmaAdicionada.id]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarTurma(form: FormControl) {
    //console.log(this.pessoa);
    this.turmaService.atualizar(this.turma)
      .then(turma => {
        this.turma = turma;

        this.atualizarTituloEdicao();
        this.messageService.add({ severity: 'success', detail: 'Turma atualizada com sucesso!' });
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarTurma(id: number) {
    return this.turmaService.buscarPorId(id)
      .then(turma => {
        this.turma = turma;
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  novo(form: FormControl) {
    form.reset(new Turma());

    this.router.navigate(['/turmas/novo']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de turma: ${this.turma.nome}`);
  }

}
