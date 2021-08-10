import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { Turma } from '../core/model';

export class TurmaFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class TurmaService {

  turmasUrl: string;

  constructor(private http: HttpClient) {
    this.turmasUrl = `${environment.apiUrl}/turmas`;
  }

  pesquisar(filtro: TurmaFiltro): Promise<any> {
    let params = new HttpParams()
      .set('page', filtro.pagina.toString())
      .set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
        params = params.set('nome', filtro.nome);
      }

    return this.http.get(`${this.turmasUrl}`, { params })
        .toPromise()
        .then(response => {
          const turmas = response['content'];

          const resultado = {
            turmas,
            total: response['totalElements']
          };

          return resultado;
        });
  }

  listarTodas(): Promise<any> {
    return this.http.get(this.turmasUrl)
      .toPromise()
      .then(response => response['content']);
  }

  buscarPorId(id: number): Promise<Turma> {
    return this.http.get<Turma>(`${this.turmasUrl}/${id}`)
      .toPromise()
      .then(response => {
        const turma = response;

        return turma;
      });
  }

  adicionar(turma: Turma): Promise<Turma> {
    return this.http.post<Turma>(this.turmasUrl, turma)
      .toPromise();
  }

  atualizar(turma: Turma): Promise<Turma> {
    return this.http.put<Turma>(`${this.turmasUrl}/${turma.id}`, turma)
      .toPromise()
      .then(response => {
        const turma = response;

        return turma;
      });
  }

  excluir(id: number): Promise<void> {
    return this.http.delete(`${this.turmasUrl}/${id}`)
      .toPromise()
      .then(() => null);
  }

}
