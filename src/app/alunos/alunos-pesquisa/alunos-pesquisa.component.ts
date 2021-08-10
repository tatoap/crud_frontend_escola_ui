import { Component, OnInit } from '@angular/core';

import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { AlunoFiltro, AlunoService } from '../aluno.service';

@Component({
  selector: 'app-alunos-pesquisa',
  templateUrl: './alunos-pesquisa.component.html',
  styleUrls: ['./alunos-pesquisa.component.css']
})
export class AlunosPesquisaComponent implements OnInit {
  alunos = [];
  filtro = new AlunoFiltro();
  totalRegistros = 0;

  constructor(
    private alunoService: AlunoService,
    private errorHandler: ErrorHandlerService
  ) {}

  ngOnInit() {}

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.alunoService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.alunos = resultado.alunos;
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

}
