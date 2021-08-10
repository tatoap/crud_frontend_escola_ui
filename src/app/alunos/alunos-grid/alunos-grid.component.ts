import { Component, Input, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { LazyLoadEvent, MessageService, ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';

import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { AuthService } from 'src/app/seguranca/auth.service';

import { AlunoFiltro, AlunoService } from '../aluno.service';
import { AlunosPesquisaComponent } from '../alunos-pesquisa/alunos-pesquisa.component';

@Component({
  selector: 'app-alunos-grid',
  templateUrl: './alunos-grid.component.html',
  styleUrls: ['./alunos-grid.component.css']
})
export class AlunosGridComponent {

  @ViewChild('tabela') grid: Table;

  constructor(private alunoService: AlunoService,
              private alunoPesquisa: AlunosPesquisaComponent,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private errorHandler: ErrorHandlerService,
              private title: Title,
              public auth: AuthService
  ) {}

 @Input() alunos = [];
 @Input() totalRegistros;
 @Input() filtro = new AlunoFiltro;

 ngOnInit() {
  this.title.setTitle('Pesquisa de alunos');
 }

 confirmarExclusao(aluno: any) {
  const numPagina = this.filtro.pagina;
  this.confirmationService.confirm({
    message: 'Confirma exclusão?',
    accept: () => {
      this.excluir(aluno, numPagina);
    },
    reject: () => {
      this.alunoPesquisa.pesquisar(numPagina);
    }
  });
 }

 excluir(aluno: any, numPagina: number) {
  this.alunoService.excluir(aluno.id)
    .then(() => {
      if (this.alunos.length === 1 && this.filtro.pagina > 0) {
        this.grid.first = (this.filtro.pagina - 1) * this.filtro.itensPorPagina;
      } else {
        this.alunoPesquisa.pesquisar(numPagina);
      }

      this.messageService.add({ severity: 'success', detail: 'Registro excluído com sucesso!' });
    })
    .catch(erro => this.errorHandler.handle(erro));
}

 aoMudarPagina(event: LazyLoadEvent) {
   const pagina = event.first / event.rows;
   this.alunoPesquisa.pesquisar(pagina);
 }

}
