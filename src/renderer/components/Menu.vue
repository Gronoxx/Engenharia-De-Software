<template>
  <div class="menu-layout">
    <div class="produtos">
      <div class="grid">
        <div class="card" v-for="produto in produtos" :key="produto.id" @click="abrirModal(produto)">
          <img :src="`http://localhost:3001${produto.foto}`" :alt="produto.nome" />
          <div class="card-content">
            <h3>{{ produto.nome }}</h3>
            <p>{{ produto.descricao.slice(0, 50) }}...</p>
            <p class="price">R$ {{ produto.preco.toFixed(2).replace('.', ',') }}</p>
            <p class="tempo-prep">⏱ {{ produto.tempoPreparo }} min</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Carrinho -->
    <transition name="fade-slide">
      <div class="carrinho-lateral" v-if="carrinho.length > 0 && mostrarCarrinho">
        <button class="btn-fechar-carrinho" @click="fecharCarrinho">✕</button>
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
            <span class="subtotal">R$ {{ (item.preco * item.quantidade).toFixed(2).replace('.', ',') }}</span>
          </div>
        </div>

        <div class="total-pedido">
          Total: R$ {{ totalPedido.toFixed(2).replace('.', ',') }}
        </div>

        <button class="btn-confirmar" :disabled="!pedidoValido" @click="finalizarPedido">
          {{ pedidoValido ? 'Finalizar Pedido' : 'Selecione Mesa e Garçom' }}
        </button>
      </div>
    </transition>

    <ModalProduto v-if="modalAberto" :produto="produtoSelecionado" @close="fecharModal" @add="adicionarAoCarrinho" />
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
      selectedGarcom: null,
      mostrarCarrinho: true
    };
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
  async created() {
    await this.carregarDados();
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
      this.mostrarCarrinho = true;
      this.fecharModal();
    },

    fecharCarrinho() {
      this.carrinho = [];
      this.mostrarCarrinho = false;
    },

    async finalizarPedido() {
      try {
        // Cálculo do valor total no frontend
        const valorTotal = this.carrinho.reduce((total, item) => {
          return total + item.preco * item.quantidade;
        }, 0);

        const pedidoData = {
          mesaId: this.selectedMesa,
          garcomId: this.selectedGarcom,
          itens: this.carrinho.map(item => ({
            produtoId: item.produtoId,
            quantidade: item.quantidade,
            observacoes: item.observacoes,
            precoUnitario: item.preco // Adicionado cálculo histórico
          })),
          valorTotal: valorTotal,
        };


        // Cria o pedido
        const pedidoResponse = await api.createPedido(pedidoData);
        if (!this.selectedMesa) throw new Error("Nenhuma mesa selecionada");
        const mesaId = Number(this.selectedMesa);

        const mesaResponse = await api.getMesas();

        console.log("Resposta completa da API:", mesaResponse);
        if (!mesaResponse) throw new Error("Erro ao pegar dados da Mesa");

        const mesaAtual = mesaResponse.data.find(m => m.id === mesaId);

        if (!mesaAtual) {
          throw new Error(`Mesa ${mesaId} não encontrada. Dados recebidos: ${JSON.stringify(mesaResponse.data)}`);
        }


        const atualizacaoMesa = {
          status: "ocupada",
          pedidosAtivos: [
            ...(mesaAtual.pedidosAtivos || []),
            pedidoResponse.data.id
          ]
        };

        await api.atualizarMesa(mesaId, atualizacaoMesa);

        // Limpa carrinho e seleções
        this.carrinho = [];
        this.selectedMesa = null;
        this.selectedGarcom = null;
        alert('Pedido realizado com sucesso!');
      } catch (error) {
        console.error('Erro completo:', error);
        alert(error.message);
      }
    }
  }
};
</script>


<style scoped>

.menu-layout {
  display: flex;
  padding: 20px;
  gap: 20px;
}

.produtos {
  flex: 1;
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

.carrinho-lateral {
  width: 300px;
  background: white;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  height: fit-content;
  position: sticky;
  top: 20px;
}

.btn-fechar-carrinho {
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 15px;
  cursor: pointer;
  color: #888;
}

.btn-fechar-carrinho:hover {
  color: #000;
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

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(50px);
}

.fade-slide-enter-to,
.fade-slide-leave-from {
  opacity: 1;
  transform: translateX(0);
}
</style>
