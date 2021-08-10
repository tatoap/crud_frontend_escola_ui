import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../seguranca/auth.guard';

import { TurmaCadastroComponent } from './turma-cadastro/turma-cadastro.component';
import { TurmasPesquisaComponent } from './turmas-pesquisa/turmas-pesquisa.component';

const routes: Routes = [
  {
    path: '',
    component: TurmasPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_TURMA'] }
  },
  {
    path: 'novo',
    component: TurmaCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_TURMA'] }
  },
  {
    path: ':id',
    component: TurmaCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_TURMA'] }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class TurmasRoutingModule { }
