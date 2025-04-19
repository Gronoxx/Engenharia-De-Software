class Produto {
  constructor({
    id,
    nome,
    preco,
    categoria,
    foto,
    tempoPreparo,
    descricao,
    ingredientes,
    ativo = true
  }) {
    this.id = id;
    this.nome = nome;
    this.preco = preco;
    this.categoria = categoria;
    this.foto = foto;
    this.tempoPreparo = tempoPreparo;
    this.descricao = descricao;
    this.ingredientes = ingredientes;
    this.ativo = ativo;
  }

  ativar() {
    this.ativo = true;
  }

  desativar() {
    this.ativo = false;
  }

  atualizarPreco(novoPreco) {
    this.preco = novoPreco;
  }

  adicionarIngrediente(ingredienteId, quantidade) {
    this.ingredientes.push({ ingredienteId, quantidade });
  }

  removerIngrediente(ingredienteId) {
    this.ingredientes = this.ingredientes.filter(
      item => item.ingredienteId !== ingredienteId
    );
  }

  toJSON() {
    return {
      id: this.id,
      nome: this.nome,
      preco: this.preco,
      categoria: this.categoria,
      foto: this.foto,
      tempoPreparo: this.tempoPreparo,
      descricao: this.descricao,
      ingredientes: this.ingredientes,
      ativo: this.ativo
    };
  }
}