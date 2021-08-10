import { Component, OnInit } from '@angular/core';

import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { TurmaFiltro, TurmaService } from '../turma.service';

@Component({
  selector: 'app-turmas-pesquisa',
  templateUrl: './turmas-pesquisa.component.html',
  styleUrls: ['./turmas-pesquisa.component.css']
})
export class TurmasPesquisaComponent implements OnInit {
  turmas = [];
  filtro = new TurmaFiltro();
  totalRegistros = 0;

  constructor(
              private turmaService: TurmaService,
              private errorHandler: ErrorHandlerService
  ) {}

  ngOnInit() {}

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.turmaService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.turmas = resultado.turmas;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }
}
