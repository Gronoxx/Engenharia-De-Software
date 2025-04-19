class Ingrediente {
  constructor({ id, nome, quantidadeEstoque, unidadeMedida, custoUnitario, estoqueMinimo }) {
    this.id = id;
    this.nome = nome;
    this.quantidadeEstoque = quantidadeEstoque;
    this.unidadeMedida = unidadeMedida;
    this.custoUnitario = custoUnitario;
    this.estoqueMinimo = estoqueMinimo;
  }

  estaAbaixoDoMinimo() {
    return this.quantidadeEstoque < this.estoqueMinimo;
  }

  reporEstoque(quantidade) {
    this.quantidadeEstoque += quantidade;
  }

  consumir(quantidade) {
    if (quantidade > this.quantidadeEstoque) {
      throw new Error(`Estoque insuficiente de ${this.nome}.`);
    }
    this.quantidadeEstoque -= quantidade;
  }

  custoTotalEstoque() {
    return this.quantidadeEstoque * this.custoUnitario;
  }

  toJSON() {
    return {
      id: this.id,
      nome: this.nome,
      quantidadeEstoque: this.quantidadeEstoque,
      unidadeMedida: this.unidadeMedida,
      custoUnitario: this.custoUnitario,
      estoqueMinimo: this.estoqueMinimo
    };
  }
}