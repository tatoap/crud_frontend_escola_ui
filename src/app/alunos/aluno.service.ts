import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { Aluno, Cidade, Estado } from '../core/model';

export class AlunoFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 3;
}

@Injectable({
  providedIn: 'root'
})
export class AlunoService {

  alunosUrl: string;
  estadosUrl: string;
  cidadesUrl: string;

  constructor(private http: HttpClient) {
    this.alunosUrl = `${environment.apiUrl}/alunos`;
    this.estadosUrl = `${environment.apiUrl}/estados`;
    this.cidadesUrl = `${environment.apiUrl}/cidades`;
  }

  pesquisar(filtro: AlunoFiltro): Promise<any> {
    let params = new HttpParams()
      .set('page', filtro.pagina.toString())
      .set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
    }

    return this.http.get(this.alunosUrl, { params })
      .toPromise()
      .then(response => {
          const alunos = response['content'];

          const resultado = {
            alunos,
            total: response['totalElements']
          };

          return resultado;
        });
  }

  listarTodas(): Promise<any> {
    return this.http.get(this.alunosUrl)
      .toPromise()
      .then(response => response['content']);
  }

  buscarPorId(id: number): Promise<Aluno> {
    return this.http.get<Aluno>(`${this.alunosUrl}/${id}`)
      .toPromise()
      .then(response => {
        const aluno = response;

        return aluno;
      });
  }

  adicionar(aluno: Aluno): Promise<Aluno> {
    return this.http.post<Aluno>(this.alunosUrl, aluno)
      .toPromise();
  }

  atualizar(aluno: Aluno): Promise<Aluno> {
    return this.http.put<Aluno>(`${this.alunosUrl}/${aluno.id}`, aluno)
      .toPromise()
      .then(response => {
        const alunoAlterado = response;

        return alunoAlterado;
      });
  }

  excluir(id: number): Promise<void> {
    return this.http.delete(`${this.alunosUrl}/${id}`)
      .toPromise()
      .then(() => null);
  }

  listarEstados(): Promise<Estado[]> {
    return this.http.get<Estado[]>(this.estadosUrl)
      .toPromise();
  }

  pesquisarCidades(estado): Promise<Cidade[]> {
    const params = new HttpParams()
      .set('estadoId', estado);

    return this.http.get<Cidade[]>(this.cidadesUrl, { params })
      .toPromise();
  }

}
