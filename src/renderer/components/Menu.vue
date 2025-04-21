<template>
  <div class="menu-container">
    <div class="grid">
      <div 
        class="card" 
        v-for="produto in produtos" 
        :key="produto.id" 
        @click="abrirModal(produto)"
      >
        <img :src="`http://localhost:3001${produto.foto}`" :alt="produto.nome" />
        <div class="card-content">
          <h3>{{ produto.nome }}</h3>
          <p>{{ produto.descricao.slice(0, 50) }}...</p>
          <p class="price">R$ {{ produto.preco.toFixed(2).replace('.', ',') }}</p>
          <p class="tempo-prep">⏱ {{ produto.tempoPreparo }} min</p>
        </div>
      </div>
    </div>

    <!-- Carrinho Flutuante -->
    <div class="carrinho-flutuante" v-if="carrinho.length > 0">
      <h3>Seu Pedido:</h3>
      
      <div class="selecoes">
        <div class="select-group">
          <label>Mesa:</label>
          <select v-model="selectedMesa" class="select-input">
            <option disabled value="">Selecione a mesa</option>
            <option v-for="mesa in mesas" :key="mesa.id" :value="mesa.id">
              Mesa {{ mesa.numero }} ({{ mesa.capacidade }} lugares)
            </option>
          </select>
        </div>

        <div class="select-group">
          <label>Garçom:</label>
          <select v-model="selectedGarcom" class="select-input">
            <option disabled value="">Selecione o garçom</option>
            <option v-for="garcom in garcons" :key="garcom.id" :value="garcom.id">
              {{ garcom.nome }}
            </option>
          </select>
        </div>
      </div>

      <div class="itens-lista">
        <div v-for="(item, index) in carrinho" :key="index" class="item-carrinho">
          <div class="item-info">
            <span class="quantidade">{{ item.quantidade }}x</span>
            <span class="nome">{{ item.nome }}</span>
            <span v-if="item.observacoes" class="observacoes">({{ item.observacoes }})</span>
          </div>
          <span class="subtotal">R$ {{ (item.preco * item.quantidade).toFixed(2) }}</span>
        </div>
      </div>

      <div class="total-pedido">
        Total: R$ {{ totalPedido.toFixed(2) }}
      </div>

      <button 
        class="btn-confirmar"
        :disabled="!pedidoValido"
        @click="finalizarPedido"
      >
        {{ pedidoValido ? 'Finalizar Pedido' : 'Selecione Mesa e Garçom' }}
      </button>
    </div>

    <ModalProduto 
      v-if="modalAberto" 
      :produto="produtoSelecionado" 
      @close="fecharModal" 
      @add="adicionarAoCarrinho"
    />
  </div>
</template>

<script>
import api from '@/services/api';
import ModalProduto from '@/renderer/components/ModalProduto.vue';

export default {
  name: 'Menu',
  components: {
    ModalProduto
  },
  data() {
    return {
      produtos: [],
      mesas: [],
      garcons: [],
      carrinho: [],
      modalAberto: false,
      produtoSelecionado: null,
      selectedMesa: null,
      selectedGarcom: null
    };
  },
  async created() {
    await this.carregarDados();
  },
  computed: {
    totalPedido() {
      return this.carrinho.reduce((total, item) => {
        return total + (item.preco * item.quantidade);
      }, 0);
    },
    pedidoValido() {
      return this.selectedMesa && this.selectedGarcom && this.carrinho.length > 0;
    }
  },
  methods: {
    async carregarDados() {
      try {
        const [produtosRes, mesasRes, garconsRes] = await Promise.all([
          api.getProdutos(),
          api.getMesas(),
          api.getGarcons()
        ]);
        
        this.produtos = produtosRes.data;
        this.mesas = mesasRes.data.filter(mesa => mesa.status === 'livre');
        this.garcons = garconsRes.data.filter(garcom => garcom.ativo);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        alert('Erro ao carregar dados do sistema!');
      }
    },

    abrirModal(produto) {
      this.produtoSelecionado = produto;
      this.modalAberto = true;
    },

    fecharModal() {
      this.modalAberto = false;
      this.produtoSelecionado = null;
    },

    adicionarAoCarrinho(dados) {
      this.carrinho.push({
        produtoId: dados.produto.id,
        nome: dados.produto.nome,
        preco: dados.produto.preco,
        quantidade: dados.quantidade,
        observacoes: dados.observacoes
      });
      this.fecharModal();
    },

    async finalizarPedido() {
      try {
        const pedidoData = {
          mesaId: this.selectedMesa,
          garcomId: this.selectedGarcom,
          itens: this.carrinho.map(item => ({
            produtoId: item.produtoId,
            quantidade: item.quantidade,
            observacoes: item.observacoes
          }))
        };

        // Cria o pedido
        const pedidoCriado = await api.createPedido(pedidoData);
        
        // Atualiza status da mesa
        await api.atualizarMesa(this.selectedMesa, {
          status: 'ocupada',
          pedidosAtivos: [...this.mesa.pedidosAtivos, pedidoCriado.data.id]
        });

        // Limpa carrinho e seleções
        this.carrinho = [];
        this.selectedMesa = null;
        this.selectedGarcom = null;
        
        alert('Pedido realizado com sucesso!');
      } catch (error) {
        console.error('Erro ao criar pedido:', error.response?.data || error.message);
        alert('Erro ao finalizar pedido! Verifique o console para detalhes.');
      }
    }
  }
};
</script>


<style scoped>
.menu-container {
  padding: 20px;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
}

.card {
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: 0.3s;
}

.card:hover {
  transform: scale(1.02);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.card img {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.card-content {
  padding: 10px;
}

.card-content h3 {
  margin: 0 0 5px;
  font-size: 1.1em;
}

.card-content p {
  font-size: 0.9em;
  color: #666;
}

.card-content .price {
  margin-top: 8px;
  font-weight: bold;
  color: #000;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.carrinho-flutuante {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: white;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 300px;
  z-index: 1000;
}

.btn-confirmar {
  background: #4CAF50;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  margin-top: 10px;
}

.tempo-prep {
  color: #666;
  font-size: 0.8em;
  margin-top: 5px;
}

.selecoes {
  margin: 15px 0;
  border-bottom: 1px solid #eee;
  padding-bottom: 15px;
}

.select-group {
  margin-bottom: 10px;
}

.select-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
  color: #444;
}

.select-input {
  width: 100%;
  padding: 8px;
  border: 2px solid #eee;
  border-radius: 6px;
  background: white;
}

.itens-lista {
  max-height: 300px;
  overflow-y: auto;
  margin: 10px 0;
}

.item-carrinho {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #f5f5f5;
}

.item-info {
  flex-grow: 1;
  margin-right: 15px;
}

.quantidade {
  font-weight: bold;
  margin-right: 5px;
}

.observacoes {
  font-size: 0.8em;
  color: #666;
  margin-left: 5px;
}

.subtotal {
  font-weight: 500;
  color: #2e7d32;
}

.total-pedido {
  text-align: right;
  font-weight: bold;
  font-size: 1.1em;
  padding: 10px 0;
  border-top: 2px solid #eee;
  margin-top: 10px;
}

.btn-confirmar:disabled {
  background: #cccccc;
  cursor: not-allowed;
}
</style>
