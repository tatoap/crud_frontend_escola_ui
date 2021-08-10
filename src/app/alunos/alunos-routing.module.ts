import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../seguranca/auth.guard';

import { AlunoCadastroComponent } from './aluno-cadastro/aluno-cadastro.component';
import { AlunosPesquisaComponent } from './alunos-pesquisa/alunos-pesquisa.component';

const routes: Routes = [
  {
    path: '',
    component: AlunosPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_ALUNO'] }
  },
  {
    path: 'novo',
    component: AlunoCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_ALUNO'] }
  },
  {
    path: ':id',
    component: AlunoCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_ALUNO'] }
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
export class AlunosRoutingModule { }
