import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

export default {
  // Pedidos
  getPedidos() {
    return api.get('/pedidos');
  },

  getPedido(id) {
    return api.get(`/pedidos/${id}`);
  },

  getPedidosAtivos() {
    return api.get('/pedidos?status_ne=entregue&_sort=dataAbertura&_order=asc');
  },

  createPedido(pedidoData) {
    return api.post('/pedidos', {
      status: 'em_preparo',
      itens: pedidoData.itens.map(item => ({
        produtoId: item.produtoId,
        quantidade: item.quantidade,
        observacoes: item.observacoes
      })),
      mesaId: pedidoData.mesaId,
      garcomId: pedidoData.garcomId,
      dataAbertura: new Date().toISOString()
    });
  },

  atualizarPedido(id, updates) {
    return api.patch(`/pedidos/${id}`, updates);
  },

  // Produtos
  getProdutos() {
    return api.get('/produtos');
  },

  getProduto(id) {
    return api.get(`/produtos/${id}`);
  },

  // Mesas
  getMesas() {
    return api.get('/mesas');
  },

  atualizarMesa(id, updates) {
    return api.patch(`/mesas/${id}`, updates);
  },

  // Garçons
  getGarcons() {
    return api.get('/garcons');
  },

  // Ingredientes
  getIngredientes() {
    return api.get('/ingredientes');
  },

  atualizarIngrediente(id, updates) {
    return api.patch(`/ingredientes/${id}`, updates);
  }
};