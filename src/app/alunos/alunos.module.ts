import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';

import { NgxMaskModule, IConfig } from 'ngx-mask';

import { AlunosRoutingModule } from './alunos-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AlunoCadastroComponent } from './aluno-cadastro/aluno-cadastro.component';
import { AlunosPesquisaComponent } from './alunos-pesquisa/alunos-pesquisa.component';
import { AlunosGridComponent } from './alunos-grid/alunos-grid.component';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [
    AlunoCadastroComponent,
    AlunosPesquisaComponent,
    AlunosGridComponent
  ],
  imports: [
    CommonModule,
    FormsModule,

    InputTextModule,
    InputMaskModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    InputTextareaModule,
    CalendarModule,
    DropdownModule,

    NgxMaskModule.forRoot(),

    SharedModule,
    AlunosRoutingModule
  ],
  exports: []
})
export class AlunosModule { }
