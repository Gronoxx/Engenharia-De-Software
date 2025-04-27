<template>
  <div class="estoque-container">
    <h2>Gerenciamento de Estoque</h2>

    <div v-if="loading" class="loading">Carregando estoque...</div>

    <div v-if="error" class="error">Erro ao carregar estoque: {{ error }}</div>

    <div v-else>
      <!-- Seção de Produção de Prato -->
      <div class="input-group">
        <select v-model="pratoSelecionado" @change="verificarIngredientesSuficientes">
          <option disabled value="">Selecionar prato</option>
          <option v-for="produto in produtos" :key="produto.id" :value="produto.id">{{ produto.nome }}</option>
        </select>

        <input type="number" v-model.number="quantidadePratos" min="1" placeholder="Quantidade de pratos" />

        <button @click="produzirPrato" :disabled="!pratoSelecionado || !ingredientesSuficientes">
          Produzir Prato
        </button>

        <p v-if="!ingredientesSuficientes && pratoSelecionado" class="error">
          Ingredientes insuficientes para produzir este prato:
        </p>
        <ul v-if="!ingredientesSuficientes">
          <li v-for="ingrediente in ingredientesFaltando" :key="ingrediente.ingredienteId">
            {{ ingrediente.nome }}: Faltando {{ ingrediente.quantidadeFaltando }} {{ ingrediente.unidadeMedida }}
          </li>
        </ul>
      </div>

      <div class="estoque-list">
        <div v-for="ingrediente in estoque" :key="ingrediente.id" class="ingrediente-card">
          <h3>{{ ingrediente.nome }}</h3>
          <p>Quantidade disponível: {{ ingrediente.quantidadeEstoque }} {{ ingrediente.unidadeMedida }}</p>

          <div class="acoes">
            <div class="input-group">
              <input type="number" v-model.number="entrada[ingrediente.id]" placeholder="Adicionar quantidade" min="0" />
              <button @click="adicionarQuantidade(ingrediente.id)">Adicionar</button>
            </div>

            <div class="input-group">
              <input type="number" v-model.number="retiradaDireta[ingrediente.id]" placeholder="Retirar quantidade" min="0" />
              <button @click="retirarQuantidadeDireta(ingrediente.id)">Retirar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/services/api';

export default {
  name: 'Estoque',
  data() {
    return {
      estoque: [],
      produtos: [],
      loading: true,
      error: null,
      entrada: {},
      retiradaDireta: {},
      pratoSelecionado: '',
      quantidadePratos: 1,
      ingredientesSuficientes: true,
    };
  },
  async created() {
    try {
      await this.carregarDados();
    } catch (err) {
      this.error = err.message;
      this.loading = false;
    }
  },
  computed: {
    ingredientesFaltando() {
      const produto = this.produtos.find(p => p.id === this.pratoSelecionado);
      if (!produto || !produto.ingredientes) {
        return [];
      }
   
      return produto.ingredientes.map(ingrediente => {
        const ingredienteEstoque = this.estoque.find(i => Number(i.id) === ingrediente.ingredienteId);
        const quantidadeNecessaria = ingrediente.quantidade * this.quantidadePratos; // Para múltiplos pratos
        if (ingredienteEstoque && ingredienteEstoque.quantidadeEstoque < quantidadeNecessaria * 1.15) {
          return {
            ingredienteId: ingredienteEstoque?.id,
            nome: ingredienteEstoque?.nome,
            quantidadeFaltando: (quantidadeNecessaria * 1.15 - (ingredienteEstoque?.quantidadeEstoque || 0)).toFixed(3),
            unidadeMedida: ingredienteEstoque?.unidadeMedida,
          };
        }
        return null;
      }).filter(Boolean);
    }
  },
  watch: {
    // Quando o prato selecionado mudar, verificar os ingredientes suficientes
    pratoSelecionado() {
      this.verificarIngredientesSuficientes();
    },

    // Quando a quantidade de pratos mudar, verificar os ingredientes suficientes
    quantidadePratos() {
      this.verificarIngredientesSuficientes();
    },

    // Quando houver mudanças na entrada de quantidade para adicionar, atualizar o estoque
    entrada: {
      handler() {
        this.carregarDados();
        this.verificarIngredientesSuficientes();  // Verifica suficiência após adição de estoque
      },
      deep: true,
    },

    // Quando houver mudanças na retirada direta de ingredientes, atualizar o estoque
    retiradaDireta: {
      handler() {
        this.carregarDados();
        this.verificarIngredientesSuficientes();  // Verifica suficiência após retirada de estoque
      },
      deep: true,
    }
  },
  methods: {
    async carregarDados() {
      const [estoqueRes, produtosRes] = await Promise.all([ 
        api.getIngredientes(),
        api.getProdutos()
      ]);
      this.estoque = estoqueRes.data;
      this.produtos = produtosRes.data;
      this.loading = false;
    },

    async adicionarQuantidade(ingredienteId) {
      const quantidade = this.entrada[ingredienteId];
      if (!quantidade || quantidade <= 0) {
        alert('Informe uma quantidade válida para adicionar.');
        return;
      }

      try {
        await api.adicionarEstoque(ingredienteId, quantidade);
        await this.carregarDados();
        this.entrada[ingredienteId] = 0;
      } catch (error) {
        console.error('Erro ao adicionar estoque:', error);
        alert('Erro ao adicionar estoque.');
      }
    },

    async retirarQuantidadeDireta(ingredienteId) {
      const quantidade = this.retiradaDireta[ingredienteId];
      if (!quantidade || quantidade <= 0) {
        alert('Informe uma quantidade válida para retirar.');
        return;
      }

      try {
        await api.retirarEstoque(ingredienteId, quantidade);
        await this.carregarDados();
        this.retiradaDireta[ingredienteId] = 0;
      } catch (error) {
        console.error('Erro ao retirar estoque:', error);
        alert('Erro ao retirar estoque.');
      }
    },

    verificarIngredientesSuficientes() {
      const produto = this.produtos.find(p => p.id === this.pratoSelecionado);
      if (!produto || !produto.ingredientes) {
        this.ingredientesSuficientes = false;
        return;
      }

      this.ingredientesSuficientes = produto.ingredientes.every(ingrediente => {
        const ingredienteEstoque = this.estoque.find(i => Number(i.id) === ingrediente.ingredienteId);
        const quantidadeNecessaria = ingrediente.quantidade * this.quantidadePratos * 1.15; // Multiplicando pela quantidade de pratos
        return ingredienteEstoque && ingredienteEstoque.quantidadeEstoque >= quantidadeNecessaria;
      });
    },

    async produzirPrato() {
      const produto = this.produtos.find(p => p.id === this.pratoSelecionado);
      if (!produto || !produto.ingredientes) {
        alert('Este prato não tem ingredientes registrados.');
        return;
      }

      try {
        for (const ingrediente of produto.ingredientes) {
          const ingredienteEstoque = this.estoque.find(i => Number(i.id) === ingrediente.ingredienteId);
          if (ingredienteEstoque) {
            const quantidadeRetirar = ingrediente.quantidade * this.quantidadePratos * 1.15; // Ajusta para múltiplos pratos
            await api.retirarEstoque(ingredienteEstoque.id, quantidadeRetirar);
          }
        }

        await this.carregarDados();
        this.pratoSelecionado = '';
        this.quantidadePratos = 1; 
        this.ingredientesSuficientes = true;
      } catch (error) {
        console.error('Erro ao produzir o prato:', error);
        alert('Erro ao produzir o prato.');
      }
    },

    getIngredienteNome(ingredienteId) {
      const ingrediente = this.estoque.find(i => Number(i.id) === ingredienteId);
      return ingrediente ? ingrediente.nome : 'Ingrediente Desconhecido';
    },

    getIngredienteUnidade(ingredienteId) {
      const ingrediente = this.estoque.find(i => Number(i.id) === ingredienteId);
      return ingrediente ? ingrediente.unidadeMedida : '';
    }
  }
};
</script>

<style scoped>
.estoque-container {
  padding: 20px;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.estoque-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.ingrediente-card {
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 0px;
  box-sizing: border-box; /* Certifique-se de que o padding não cause overflow */
}

.acoes {
  margin-top: 10px;
}

.input-group {
  display: flex;
  margin-bottom: 10px;
}

.input-group input,
.input-group select {
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px 0 0 5px;
  box-sizing: border-box; /* Garantir que o padding não faça os elementos ultrapassarem os limites */
}

.input-group button {
  padding: 8px 12px;
  border: none;
  background: #4CAF50;
  color: white;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
  box-sizing: border-box;
}

.input-group button:hover {
  background: #45a049;
}

.loading,
.error {
  text-align: center;
  margin-top: 30px;
  font-size: 1.2em;
}

.error {
  color: red;
}

.ingredientes-faltando {
  background-color: #fff3cd;
  border: 1px solid #ffeeba;
  padding: 10px;
  border-radius: 4px;
  margin-top: 20px;
}

.ingredientes-faltando h4 {
  font-size: 1.1em;
  color: #856404;
}

.ingredientes-faltando ul {
  list-style-type: none;
  padding: 0;
}

.ingredientes-faltando li {
  font-size: 14px;
  margin-bottom: 5px;
}
</style>