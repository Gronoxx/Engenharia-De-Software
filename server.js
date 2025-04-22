const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults({ static: 'public' });

// Configuração básica
server.use(jsonServer.bodyParser);
server.use(middlewares);
server.use(router);

// Rota PATCH personalizada para mesas
server.patch('/mesas/:id', (req, res, next) => {
  console.log('Atualizando mesa:', req.params.id);
  next(); // Passa para o handler padrão do JSON Server
});

server.listen(3001, () => {
  console.log('JSON Server rodando na porta 3001');
});