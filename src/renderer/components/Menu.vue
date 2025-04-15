<template>
  <div class="menu-container">

    <div class="grid">
      <div class="card" v-for="(item, index) in produtos" :key="index" @click="abrirModal(item)">
        <img :src="item.foto" :alt="item.titulo" />
        <div class="card-content">
          <h3>{{ item.titulo }}</h3>
          <p>{{ item.descricao.slice(0, 50) }}...</p>
          <p class="price">R$ {{ item.preco.toFixed(2).replace('.', ',') }}</p>
        </div>
      </div>
    </div>

    <ModalProduto v-if="modalAberto" :produto="produtoSelecionado" @close="fecharModal" @add="adicionarPedido" />
  </div>
</template>

<script>
import ModalProduto from '@/renderer/components/ModalProduto.vue';

export default {
  name: 'Menu',
  components: {
    ModalProduto
  },
  data() {
    return {
      produtos: [
        {
          foto: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90",
          titulo: "Classic Burger",
          descricao: "Pão brioche, hambúrguer 180g, queijo cheddar, alface, tomate e maionese da casa.",
          preco: 28.9,
          tempo_preparo: "15 min"
        },
        {
          foto: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?q=80&w=1368&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          titulo: "Bacon Supreme",
          descricao: "Hambúrguer suculento com bacon crocante, queijo prato, cebola caramelizada e molho especial.",
          preco: 32.5,
          tempo_preparo: "15 min"
        },
        {
          foto: "https://images.unsplash.com/photo-1618219878829-8afd92751bed?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          titulo: "Veggie Delight",
          descricao: "Hambúrguer de grão de bico, queijo vegano, rúcula, tomate e maionese de ervas.",
          preco: 26.0,
          tempo_preparo: "15 min"
        },
        {
          foto: "https://images.unsplash.com/photo-1676723009754-8359b42536ce?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          titulo: "Margherita",
          descricao: "Massa fina com molho artesanal, mussarela, tomate e manjericão fresco.",
          preco: 45.0,
          tempo_preparo: "25 min"
        },
        {
          foto: "https://images.unsplash.com/photo-1564128442383-9201fcc740eb?q=80&w=1531&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          titulo: "Pepperoni",
          descricao: "Cobertura generosa de pepperoni com mussarela gratinada e toque de orégano.",
          preco: 52.9,
          tempo_preparo: "25 min"
        },
        {
          foto: "https://images.unsplash.com/photo-1566843971939-1fe9e277a0c0?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          titulo: "Quatro Queijos",
          descricao: "Mussarela, gorgonzola, catupiry e parmesão sobre molho branco cremoso.",
          preco: 54.0,
          tempo_preparo: "25 min"
        },
        {
          foto: "https://plus.unsplash.com/premium_photo-1667540791706-a123bf631f0b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          titulo: "Frango com Catupiry",
          descricao: "Frango desfiado, catupiry, milho e orégano, tudo sobre uma massa fina crocante.",
          preco: 49.5,
          tempo_preparo: "25 min"
        }
      ],
      modalAberto: false,
      produtoSelecionado: {}
    };
  },
  methods: {
    abrirModal(item) {
      this.produtoSelecionado = item;
      this.modalAberto = true;
    },
    fecharModal() {
      this.modalAberto = false;
      this.produtoSelecionado = {};
    },
    adicionarPedido(item) {
      //Fazer a função
      console.log("Pedido adicionado:", item);
      this.fecharModal();
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
</style>
