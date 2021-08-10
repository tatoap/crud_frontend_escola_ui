import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { AuthService, UsuarioForm } from '../auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

  salvar = false;

  dadosUsuario = new UsuarioForm();

  constructor(private auth: AuthService,
              private errorHandler: ErrorHandlerService,
              private router: Router
  ) {
    const usuario = localStorage.getItem('login');
    const senha = localStorage.getItem('senha');
    if (usuario && senha) {
      console.log('login -> ' + usuario);
      this.dadosUsuario.email = usuario;
      this.dadosUsuario.password = senha;
    }
  }

  login(usuario: string, senha: string) {
    console.log(this.salvar);
    this.auth.login(usuario, senha)
      .then(() => {

        if (this.salvar){
          this.auth.armazenarLogin(usuario, senha);
        }
        this.router.navigate(['/alunos']);
      })
      .catch(erro => {
        this.errorHandler.handle(erro);
      });
  }

}
