<template>
  <div>
    <h3>Mesa #{{ mesa.numero }}</h3>

    <p>Status: {{ mesa.status }}</p>
    <p>Capacidade: {{ mesa.capacidade }}</p>
    <p>Pedidos: {{ mesa.getPedido }}</p>

    <div class="input-group" >
    <button @click="toggleMesa">
      {{ mesa.status === 'livre' ? 'Ocupar' : 'Liberar' }}
    </button>
    <div v-if="mesa.status === 'livre'">
      <button @click="$emit('remover')">Remover Mesa</button>
    </div>
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
        this.mesa.adicionarPedido();
      } else {
        this.mesa.liberarMesa();
      }
    },
    adicionarPedido(pedido) {
      this.mesa.adicionarPedido(pedido);
    },
    getPedido(id){

    }
  }
};
</script>

<style scoped>

.input-group{
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-bottom: 20px;
}

.input-group button {
  padding: 8px 12px;
  border: none;
  background: #4CAF50;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  box-sizing: border-box;
}

.input-group button:disabled{
  background: #d3d3d3; /* Grey background */
  color: #a0a0a0; /* Light grey text */
  cursor: not-allowed;
}

.card-content {
  padding: 10px;
}

.greyed-out {
  background-color: #d3d3d3;
  color: #a0a0a0;
  cursor: not-allowed;
}

</style>
