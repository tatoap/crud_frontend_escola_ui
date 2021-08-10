import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';

import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { AuthService } from 'src/app/seguranca/auth.service';
import { TurmaFiltro, TurmaService } from '../turma.service';
import { TurmasPesquisaComponent } from '../turmas-pesquisa/turmas-pesquisa.component';

@Component({
  selector: 'app-turmas-grid',
  templateUrl: './turmas-grid.component.html',
  styleUrls: ['./turmas-grid.component.css']
})
export class TurmasGridComponent implements OnInit {

  @ViewChild('tabela') grid: Table;

  constructor(private turmaService: TurmaService,
              private turmaPesquisa: TurmasPesquisaComponent,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private errorHandler: ErrorHandlerService,
              private title: Title,
              public auth: AuthService
  ) {}

  @Input() turmas = [];
  @Input() totalRegistros;
  @Input() filtro = new TurmaFiltro;

  ngOnInit() {
    this.title.setTitle('Pesquisa de turmas');
  }

  confirmarExclusao(turma: any) {
    const numPagina = this.filtro.pagina;
    this.confirmationService.confirm({
      message: 'Confirma exclusão?',
      accept: () => {
        this.excluir(turma, numPagina);
      },
      reject: () => {
        this.turmaPesquisa.pesquisar(numPagina);
      }
    });
  }

  excluir(turma: any, numPagina: number) {
    this.turmaService.excluir(turma.id)
      .then(() => {
        this.manterNaPaginaDePesquisa(numPagina);

        this.messageService.add({ severity: 'success', detail: 'Turma excluída com sucesso!' });
      })
      .catch(erro => {
        this.errorHandler.handle(erro);
        this.manterNaPaginaDePesquisa(numPagina);
      });
  }

  manterNaPaginaDePesquisa(numPagina: number) {
    if (this.turmas.length === 1 && this.filtro.pagina > 0) {
      this.grid.first = (this.filtro.pagina - 1) * this.filtro.itensPorPagina;
    } else {
      this.turmaPesquisa.pesquisar(numPagina);
    }
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.turmaPesquisa.pesquisar(pagina);
  }

}
