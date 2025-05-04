let contadorIdMesa = 1; // controle interno para gerar IDs únicos no sistema

export default class Mesa {
  constructor(numero, capacidade) {
    this.id = contadorIdMesa++;       // ID interno do sistema
    this.numero = numero;             // Número da mesa (visível)
    this.status = 'livre';            // 'livre' ou 'ocupada'
    this.capacidade = capacidade;     // Quantas pessoas comporta
    this.pedidos = [];                // Lista de pedidos feitos
    this.valorTotal = 0;              // Valor total gasto
  }

  ocuparMesa() {
    this.status = 'ocupada';
  }

  liberarMesa() {
    this.status = 'livre';
    this.pedidos = [];
    this.valorTotal = 0;
  }

  adicionarPedido(pedido) {
    if (this.status !== 'ocupada') {
      throw new Error(`Mesa ${this.numero} está livre. Ocupe a mesa antes de adicionar pedidos.`);
    }

    this.pedidos.push(pedido);
    this.valorTotal += pedido.calcularTotal();
  }

  listarPedidos() {
    return this.pedidos;
  }

  toJSON(){
    return{
      id: this.id,        // ID interno do sistema
      numero: this.numero,             // Número da mesa (visível)
      status: this.status,            // 'livre' ou 'ocupada'
      capacidade: this.capacidade,     // Quantas pessoas comporta
      pedidos: this.pedidos,                // Lista de pedidos feitos
      valorTotal: this.valorTotal   
    };
  }
}