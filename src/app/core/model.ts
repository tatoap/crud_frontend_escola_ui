export class Estado {
  id: number;
  nome: string;
}

export class Cidade {
  id: number;
  nome: string;
  estado = new Estado();
}

export class Endereco {
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cep: string;
  cidade = new Cidade();
}

export class Usuario {
  login: string;
  senha: string;
}

export class Aluno {
  id: number;
  nome: string;
  idade: number;
  telefone: string;
  endereco = new Endereco();

  constructor(id?: number, nome?: string, idade?: number, telefone?: string) {
    this.id = id;
    this.nome = nome;
    this.idade = idade;
    this.telefone = telefone;
  }
}

export class Turma {
  id: number;
  nome: string;
  instrutor: string;
  cargaHoraria: number;
  alunos = new Array<Aluno>();
}
