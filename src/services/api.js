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
      dataAbertura: new Date().toISOString(),
      valorTotal: pedidoData.valorTotal
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
    return api.get('/mesas')
      .then(response => {
        console.log("Resposta bruta de /mesas:", response); // Debug
        return response;
      })
      .catch(error => {
        console.error("Erro na requisição getMesas:", error);
        throw error;
      });
  },

  atualizarMesa(id, updates) {
    console.log('Atualizando mesa ID:', id);
    console.log('Dados de atualização:', updates);
    return api.patch(`/mesas/${id}`, updates)
      .then(response => {
        console.log('Resposta da atualização:', response.data);
        return response;
      })
      .catch(error => {
        console.error('Erro na atualização:', error.response?.data);
        throw error;
      });
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
  },

  adicionarEstoque(ingredienteId, quantidadeAdicionar) {
    // Primeiro busca o ingrediente atual para somar a quantidade
    return api.get(`/ingredientes/${ingredienteId}`).then(response => {
      const ingredienteAtual = response.data;
      return api.patch(`/ingredientes/${ingredienteId}`, {
        quantidadeEstoque: ingredienteAtual.quantidadeEstoque + quantidadeAdicionar
      });
    });
  },

  retirarEstoque(ingredienteId, quantidadeRetirar) {
    // Primeiro busca o ingrediente atual para subtrair a quantidade
    return api.get(`/ingredientes/${ingredienteId}`).then(response => {
      const ingredienteAtual = response.data;
      let novaQuantidade = ingredienteAtual.quantidadeEstoque - quantidadeRetirar;

      if (novaQuantidade < 0) novaQuantidade = 0; // Não deixa ficar negativo!

      return api.patch(`/ingredientes/${ingredienteId}`, {
        quantidadeEstoque: novaQuantidade
      });
    });
  },
};