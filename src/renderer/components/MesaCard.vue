<template>
  <div>
    <div class="mesas-card">
    <h3>Mesa #{{ mesa.numero }}</h3>
    <p>Status: {{ mesa.status }}</p>
    <p>Capacidade: {{ mesa.capacidade }}</p>
    
    <div class="input-group">
    <button @click="toggleMesa">
      {{ mesa.status === 'livre' ? 'Ocupar' : 'Liberar' }}
    </button>
    <div v-if="mesa.status === 'livre'">
      <button @click="$emit('remover')">Remover Mesa</button>
    </div>
    </div>
  </div>


  <div v-if="mesa.showInputCard" class="input-card">
  <h3>Informações da Mesa</h3>
  <p>Garçom: {{ mesa.garcom?.nome || 'Nenhum' }}</p>
  <select v-model="selectedGarcom" class="input-group">
    <option disabled value="">Selecione o garçom</option>
    <option v-for="garcom in mesa.garcons" :key="garcom.id" :value="garcom.id">
      {{ garcom.nome }}
    </option>
  </select>


  <button @click="confirmMesaInfo">Confirmar</button>
</div>
</div>

</template>

<script>

export default {
  name: 'MesaCard',
  props: {
    mesa: Object,
    garcons: Array,
    pedidos: Array
  },
  computed:{
    pedidoDaMesa() {
    return this.pedidos.find(
      p => p.mesaId === this.mesa.id
    );
    }
  },
  methods: {
    toggleMesa() {
      /*
      if (this.mesa.status === 'livre') {
        this.mesa.status = 'ocupada';
      } else {
        this.mesa.status='livre';
      }
      */
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

.input-card {
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  margin-top: 16px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.input-card h4 {
  margin-bottom: 12px;
}

.form-group {
  margin-bottom: 12px;
}

.form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 4px;
}

.form-group input {
  width: 100%;
  padding: 8px;
  border: 1px solid #aaa;
  border-radius: 4px;
  box-sizing: border-box;
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