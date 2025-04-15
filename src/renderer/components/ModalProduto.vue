<template>
  <div class="modal" @click.self="$emit('close')">
    <div class="modal-content">
      <img :src="produto.foto" />
      <h2>{{ produto.titulo }}</h2>
      <p>{{ produto.descricao }}</p>
      <p><strong>Preço:</strong> R$ {{ produto.preco.toFixed(2).replace('.', ',') }}</p>
      <p><strong>Tempo de preparo:</strong> {{ produto.tempo_preparo }}</p>
      <button class="add-btn" @click="$emit('add', produto)">
        Adicionar Pedido
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    produto: Object
  }
};
</script>

<style scoped>
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 90%;
  max-width: 500px;
  position: relative;
}

.modal-content img {
  width: 100%;
  height: 300px;
  object-fit: cover;
  object-position: center;
  border-radius: 10px;
}

.add-btn {
  margin-top: 15px;
  padding: 10px 16px;
  background-color: #8B0000;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.2s;
}

.add-btn:hover {
  background-color: #a00000;
}
</style>