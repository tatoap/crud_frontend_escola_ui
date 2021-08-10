import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { InputMaskModule } from 'primeng/inputmask';
import { PanelModule } from 'primeng/panel';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';

import { TurmasRoutingModule } from './turmas-routing.module';
import { SharedModule } from '../shared/shared.module';
import { TurmaCadastroComponent } from './turma-cadastro/turma-cadastro.component';
import { TurmasPesquisaComponent } from './turmas-pesquisa/turmas-pesquisa.component';
import { TurmasGridComponent } from './turmas-grid/turmas-grid.component';
import { TurmaCadastroAlunoComponent } from './turma-cadastro-aluno/turma-cadastro-aluno.component';

@NgModule({
  declarations: [
    TurmaCadastroComponent,
    TurmasPesquisaComponent,
    TurmasGridComponent,
    TurmaCadastroAlunoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,

    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    InputMaskModule,
    PanelModule,
    DialogModule,
    DropdownModule,

    SharedModule,
    TurmasRoutingModule
  ],
  exports: []
})
export class TurmasModule { }
