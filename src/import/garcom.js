class Garcom {
  constructor({ id, nome, email, ativo = true, vendasTotais = 0.0 }) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.ativo = ativo;
    this.vendasTotais = vendasTotais;
  }

  ativar() {
    this.ativo = true;
  }

  desativar() {
    this.ativo = false;
  }

  registrarVenda(valor) {
    if (!this.ativo) {
      throw new Error(`Garçom ${this.nome} não está ativo para registrar vendas.`);
    }
    this.vendasTotais += valor;
  }

  toJSON() {
    return {
      id: this.id,
      nome: this.nome,
      email: this.email,
      ativo: this.ativo,
      vendasTotais: this.vendasTotais
    };
  }
}
