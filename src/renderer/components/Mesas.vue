<template>
      <h2>Mesas Ocupadas</h2>
      <div class="menu-layout">
        <div class="produtos">
      <div class="grid">
          <div v-if="mesasOcupadas.length === 0">Nenhuma mesa ocupada.</div>
          <div v-for="mesa in mesasOcupadas" :key="mesa.id" class="card">
            <MesaCard :mesa="mesa" :pedidos="pedidos"/>
          </div>
          </div>
        </div>
      </div>

      <h2 class="mt-6">Mesas Livres</h2>
      <div class="menu-layout">
        <div class="produtos">
        <div class="grid">
          <div v-if="mesasLivres.length === 0">Nenhuma mesa livre.</div>
          <div v-for="mesa in mesasLivres" :key="mesa.id" class="card mb-3 border p-2 rounded">
            <MesaCard :mesa="mesa" :pedidos="pedidos" @remover="removerMesa(mesa.id)" />
          </div>
        </div>
      </div>
    </div>

    <div class="input-group">
        <button @click="adicionarMesa">Adicionar Mesa</button>
        <button :disabled="mesasOcupadas.length === 0" @click="liberarTodasMesas">Liberar Todas As Mesas</button>
      </div>
</template>

<script>
import api from '@/services/api';
import Mesa from '@/import/mesa';
import MesaCard from '@/renderer/components/MesaCard.vue';

// adicionar mesas; ver cada mesa como um quadradinho, com o numero dela, e pedidos junto
// quando clica na mesa da pra ver a hora de inicio, pedidos, opcao de liberar ela

export default{
  name: 'Mesas',
  components: { MesaCard },
  data(){
    return {
      mesas: [],
      garcons: [],
      pedidos: [],
      mesaSelecionada: null,
      cardAberto: false
    };
  },
  async created(){
    await this.carregarDados();
    this.interval = setInterval(this.updateTempos, 60000);
  },
  computed:{
    mesasOcupadas(){
      return this.mesas.filter(m=> m.status === 'ocupada');
    },
    mesasLivres(){
      return this.mesas.filter(m => m.status === 'livre');
    }
  },
  methods:{async carregarDados() {
  try {
    const [produtosRes, mesasRes, garconsRes] = await Promise.all([
      api.getProdutos(),
      api.getMesas(),
      api.getGarcons()
    ]);

    this.produtos = produtosRes.data;
    this.mesas = mesasRes.data;
    this.garcons = garconsRes.data.filter(garcom => garcom.ativo);
    this.status = 'livre';
    this.valorTotal = 0;


  } catch (error) {
    console.error('Erro ao carregar dados:', error);
    alert('Erro ao carregar dados do sistema!');
  }
},
    adicionarMesa(){
      const numero = this.mesas.length + 1;
      const novaMesa= new Mesa(numero, 4);
      novaMesa.garcom = '';
      this.mesas.push(novaMesa);
    },
    removerMesa(id){
      this.mesas = this.mesas.filter(m=> m.id !== id);
    },
    ocuparMesa(){
      const novoPedidoID = this.pedidos.length +1;
      const novoPedido = new Pedido(
        novoPedidoID,
        [],
      )
    },
    getGarcomMesa(id){
      const pedido = this.pedidos.find(p => p.mesaId === mesaId && p.status === 'pendente');
      return pedido?.garcomId || null;
    },  
    liberarMesa(){
      this.status = 'livre';
      numero = numero-1;
      this.pedidos = [];
      this.valorTotal = 0;  
    },
    liberarTodasMesas(){
      this.mesas.forEach(mesa=>{
        mesa.status = 'livre';
        mesa.pedidos = [];
        mesa.valorTotal = 0;  
      })
    },
    abrirCard(mesa){
      this.mesaSelecionada = mesa;
      this.cardAberto = true;
    },
    fecharCard(mesa){
      this.cardAberto = false;
      this.mesaSelecionada = null;
    }
  }
}
</script>

<style scoped>

/* Geral */
.menu-layout {
  display: flex;
  padding: 20px;
  gap: 20px;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}


.produtos {
  flex: 1;
}

.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.card {
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card:hover {
  transform: scale(1.02);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.input-group{
  display: flex;
  gap: 10px; 
  justify-content: center; 
  margin-bottom: 10px;
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