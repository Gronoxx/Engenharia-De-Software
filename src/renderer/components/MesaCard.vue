<template>
  <div>
    <p><strong>Mesa #{{ mesa.numero }}</strong> (Capacidade: {{ mesa.capacidade }} Pedidos: {{ mesa.pedidos }})</p>
    <p>Status: {{ mesa.status }}</p>

    <div v-if="mesa.status === 'ocupada'">
    </div>
    
    <button @click="toggleMesa">
      {{ mesa.status === 'livre' ? 'Ocupar' : 'Liberar' }}
    </button>
    <div v-if="mesa.status === 'livre'">
      <button @click="$emit('remover')">Remover Mesa</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MesaCard',
  props: ['mesa'],
  methods: {
    toggleMesa() {
      if (this.mesa.status === 'livre') {
        this.mesa.status = 'ocupada';
        // const nomeGarcom = prompt('Nome do garçom:');
        // if (nomeGarcom) this.mesa.ocuparMesa(nomeGarcom);
      } else {
        this.mesa.liberarMesa();
      }
    }
    // adicionarPedido() {
    //   const pedido = {
    //     itens: [
    //       { nome: 'Hambúrguer', preco: 25 },
    //       { nome: 'Refrigerante', preco: 8 }
    //     ],
    //     calcularTotal() {
    //       return this.itens.reduce((t, item) => t + item.preco, 0);
    //     }
    //   };
    //   this.mesa.adicionarPedido(pedido);
    // }
  }
};
</script>
