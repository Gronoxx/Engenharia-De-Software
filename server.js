const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults({
    static: 'public'
});

// Middleware para calcular o valor total antes de salvar pedidos
server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
    if (req.method === 'POST' && req.path === '/pedidos') {
      const produtos = router.db.get('produtos').value();
      
      req.body.itens = req.body.itens.map(item => {
        const produto = produtos.find(p => p.id === item.produtoId);
        return {
          ...item,
          precoUnitario: produto.preco // Garante o preço histórico
        };
      });
      
      // Adiciona cálculo do valorTotal
      req.body.valorTotal = calcularValorTotal(req.body.itens, produtos);
      
      // Adiciona timestamp e status padrão
      req.body.dataAbertura = new Date().toISOString();
      req.body.status = 'em_preparo';
    }
    next();
  });

server.use(middlewares);
server.use(router);
server.listen(3001, () => {
  console.log('JSON Server is running');
});

const calcularValorTotal = (itens, produtos) => {
    return itens.reduce((total, item) => {
      const produto = produtos.find(p => p.id === item.produtoId);
      return total + (produto.preco * item.quantidade);
    }, 0);
  };