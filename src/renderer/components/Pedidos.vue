<template>
  <div class="pedidos-container">
    <h2>Pedidos Ativos</h2>

    <!-- Loading State -->
    <div v-if="loading" class="loading">Carregando pedidos...</div>

    <!-- Error State -->
    <div v-if="error" class="error">Erro ao carregar pedidos: {{ error }}</div>

    <!-- Data Display -->
    <div v-else class="pedidos-list">
      <div v-for="pedido in pedidos" :key="pedido.id" class="pedido-card">
        <div class="pedido-header">
          <h3>Pedido #{{ pedido.id }}</h3>
          <span class="status" :class="pedido.status">{{ formatarStatus(pedido.status) }}</span>
        </div>
        <p class="mesa">Mesa: {{ pedido.mesaId }}</p>
        <p class="tempo">Tempo decorrido: {{ pedido.tempoDecorrido }}</p>
        <p class="total">Total: R$ {{ formatarValor(pedido.valorTotal) }}</p>
        <div class="itens">
          <h4>Itens:</h4>
          <ul>
            <li v-for="(item, index) in pedido.itens" :key="index">
              {{ item.quantidade }}x {{ getProductName(item.produtoId) }}
              <span v-if="item.observacoes">({{ item.observacoes }})</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/services/api';  // Adjust path if needed

export default {
  name: 'Pedidos',
  data() {
    return {
      pedidos: [],
      loading: true,
      error: null,
      produtos: [],
      interval: null // Para armazenar o intervalo de atualização
    };
  },
  async created() {
    try {
      await this.fetchData();
      // Atualiza os tempos a cada minuto
      this.interval = setInterval(this.updateTempos, 60000);
    } catch (err) {
      this.error = err.message;
      this.loading = false;
    }
  },
  beforeUnmount() {
    // Limpa o intervalo quando o componente é destruído
    clearInterval(this.interval);
  },
  methods: {
    async fetchData() {
      const pedidosResponse = await api.getPedidosAtivos();
      this.pedidos = pedidosResponse.data.map(pedido => ({
        ...pedido,
        tempoDecorrido: this.calcularTempoDecorrido(pedido.dataAbertura)
      }));

      const produtosResponse = await api.getProdutos();
      this.produtos = produtosResponse.data;
      this.loading = false;
    },

    updateTempos() {
      this.pedidos = this.pedidos.map(pedido => ({
        ...pedido,
        tempoDecorrido: this.calcularTempoDecorrido(pedido.dataAbertura)
      }));
    },

    calcularTempoDecorrido(dataAbertura) {
      const agora = new Date();
      const abertura = new Date(dataAbertura);
      const diff = agora - abertura;

      // Converter para horas e minutos
      const horas = Math.floor(diff / (1000 * 60 * 60));
      const minutos = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      return `${horas}h ${minutos}min`;
    },

    getProductName(produtoId) {
      const produto = this.produtos.find(p => p.id === produtoId);
      return produto ? produto.nome : 'Produto não encontrado';
    },

    formatarValor(valor) {
      return Number(valor || 0).toFixed(2).replace('.', ',');
    },

    formatarStatus(status) {
      const mapa = {
        em_preparo: 'Em preparo',
        pronto: 'Pronto',
        entregue: 'Entregue'
      };
      return mapa[status] || status;
    }
  }
};
</script>

<style scoped>
.pedidos-container {
  padding: 20px;
}

.pedido-card {
  background: white;
  border-radius: 8px;
  padding: 15px;
  margin: 10px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.status {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.9em;
}

.status.em_preparo {
  background: #fff3cd;
  color: #856404;
}

.status.pronto {
  background: #d4edda;
  color: #155724;
}

.loading,
.error {
  padding: 20px;
  text-align: center;
}

.tempo {
  color: #666;
  font-size: 0.9em;
  margin: 5px 0;
}
</style>