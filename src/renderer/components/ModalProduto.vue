<template>
  <div class="modal" @click.self="$emit('close')">
    <div class="modal-content">
      <img :src="produto.foto" :alt="produto.nome" />
      <h2>{{ produto.nome }}</h2>
      <div class="details">
        <p class="description">{{ produto.descricao }}</p>
        <div class="info-grid">
          <div class="info-item">
            <span class="label">Preço:</span>
            <span class="value">R$ {{ produto.preco.toFixed(2).replace('.', ',') }}</span>
          </div>
          <div class="info-item">
            <span class="label">Tempo:</span>
            <span class="value">{{ produto.tempoPreparo }} minutos</span>
          </div>
        </div>
      </div>

      <div class="controls">
        <div class="quantity-control">
          <label>Quantidade:</label>
          <input
            type="number"
            v-model.number="quantidade"
            min="1"
            class="quantity-input"
          />
        </div>
        
        <div class="observations">
          <label>Observações:</label>
          <textarea
            v-model="observacoes"
            placeholder="Ex: Sem cebola, ponto da carne..."
            rows="2"
          ></textarea>
        </div>
      </div>

      <button class="add-btn" @click="handleAdd">
        Adicionar Pedido ({{ totalItem }})
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    produto: Object
  },
  data() {
    return {
      quantidade: 1,
      observacoes: ''
    };
  },
  computed: {
    totalItem() {
      return (this.produto.preco * this.quantidade).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      });
    }
  },
  methods: {
    handleAdd() {
      this.$emit('add', {
        produto: this.produto,
        quantidade: this.quantidade,
        observacoes: this.observacoes
      });
      this.resetControls();
    },
    resetControls() {
      this.quantidade = 1;
      this.observacoes = '';
    }
  }
};
</script>

<style scoped>
.modal-content {
  background: #fff;
  padding: 25px;
  border-radius: 12px;
  width: 90%;
  max-width: 450px;
  box-shadow: 0 8px 30px rgba(0,0,0,0.12);
}

.modal-content img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 15px;
}

.details {
  margin: 15px 0;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-top: 15px;
}

.info-item {
  background: #f5f5f5;
  padding: 12px;
  border-radius: 8px;
}

.label {
  display: block;
  font-size: 0.9em;
  color: #666;
  margin-bottom: 4px;
}

.value {
  font-weight: 600;
  color: #333;
}

.controls {
  margin-top: 20px;
}

.quantity-control {
  margin-bottom: 15px;
}

.quantity-control label,
.observations label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #444;
}

.quantity-input {
  width: 100%;
  padding: 10px;
  border: 2px solid #eee;
  border-radius: 8px;
  font-size: 1.1em;
}

.observations textarea {
  width: 100%;
  padding: 10px;
  border: 2px solid #eee;
  border-radius: 8px;
  resize: vertical;
  min-height: 60px;
  font-family: inherit;
}

.add-btn {
  width: 100%;
  padding: 14px;
  background: #2ecc71;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1em;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 20px;
}

.add-btn:hover {
  background: #27ae60;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(46, 204, 113, 0.25);
}
</style>