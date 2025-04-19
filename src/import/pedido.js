class Pedido {
  constructor(id, itens, garcomId, mesaId, status = 'pendente') {
    this.id = id;
    this.status = status;
    this.itens = itens; // array de objetos { produtoId, quantidade, observacoes, subtotal }
    this.garcomId = garcomId;
    this.mesaId = mesaId;
    this.dataAbertura = new Date(); // data e hora da criação
    this.valorTotal = this.calcularTotal();
  }

  calcularTotal() {
    return this.itens.reduce((total, item) => total + item.subtotal, 0);
  }

  atualizarStatus(novoStatus) {
    this.status = novoStatus;
  }

  calcularTempoDecorrido() {
    const agora = new Date();
    const diffMs = agora - this.dataAbertura;
    const minutos = Math.floor(diffMs / 60000);
    const horas = Math.floor(minutos / 60);
    const minutosRestantes = minutos % 60;

    const pad = n => String(n).padStart(2, '0');
    return `${pad(horas)}:${pad(minutosRestantes)}`;
  }

  toJSON() {
    return {
      id: this.id,
      status: this.status,
      itens: this.itens,
      valorTotal: this.valorTotal,
      garcomId: this.garcomId,
      mesaId: this.mesaId,
      dataAbertura: this.dataAbertura.toISOString(),
      tempoDecorrido: this.calcularTempoDecorrido()
    };
  }
}