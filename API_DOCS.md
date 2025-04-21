# 📖 API Docs – Sistema de Gestão de Bares/Restaurantes

## 📦 Entidades

---

### 🪑 Mesa

```json
{
  "id": 1,
  "numero": "A1",
  "status": "ocupada",
  "capacidade": 4,
  "pedidosAtivos": [5, 8],
  "valorTotalGasto": 235.50
}
```

**Campos:**

- `id` (int): Identificador único da mesa.
- `numero` (string): Identificação da mesa (ex: A1, B2).
- `status` (string): Situação atual da mesa (ex: *livre*, *ocupada*).
- `capacidade` (int): Número de pessoas que a mesa comporta.
- `pedidosAtivos` (array[int]): Lista de IDs de pedidos ainda em aberto.
- `valorTotalGasto` (float): Total gasto pelos clientes na mesa.

---

### 🧾 Pedido

```json
{
  "id": 5,
  "status": "em_preparo",
  "itens": [
    {
      "produtoId": 3,
      "quantidade": 2,
      "observacoes": "Sem cebola",
      "subtotal": 45.80
    }
  ],
  "valorTotal": 91.60,
  "garcomId": 2,
  "mesaId": 1,
  "dataAbertura": "2025-04-20T19:30:00Z",
  "tempoDecorrido": "00:25"
}
```

**Campos:**

- `id` (int): Identificador único do pedido.
- `status` (string): Situação atual do pedido (ex: *em_preparo*, *pronto*, *entregue*).
- `itens` (array[obj]): Lista dos itens pedidos.
- `valorTotal` (float): Valor total do pedido.
- `garcomId` (int): ID do garçom responsável.
- `mesaId` (int): ID da mesa associada.
- `dataAbertura` (datetime): Data/hora de abertura do pedido.
- `tempoDecorrido` (string): Tempo desde a abertura (formato HH:mm).

---

### 🍔 Produto

```json
{
  "id": 3,
  "nome": "Hambúrguer Artesanal",
  "preco": 22.90,
  "categoria": "lanches",
  "foto": "hamburguer.jpg",
  "tempoPreparo": 20,
  "descricao": "Pão brioche, carne 180g, queijo cheddar",
  "ingredientes": [
    {"ingredienteId": 5, "quantidade": 0.2}
  ],
  "ativo": true
}
```

**Campos:**

- `id` (int): Identificador do produto.
- `nome` (string): Nome do produto.
- `preco` (float): Preço unitário.
- `categoria` (string): Categoria do item (ex: *lanches*, *bebidas*).
- `foto` (string): Nome do arquivo da imagem.
- `tempoPreparo` (int): Tempo médio de preparo (em minutos).
- `descricao` (string): Descrição do prato.
- `ingredientes` (array[obj]): Lista de ingredientes usados com quantidade.
- `ativo` (bool): Indica se o produto está disponível para pedidos.

---

### 🧂 Ingrediente

```json
{
  "id": 5,
  "nome": "Queijo Cheddar",
  "quantidadeEstoque": 8.5,
  "unidadeMedida": "kg",
  "custoUnitario": 8.50,
  "estoqueMinimo": 2.0
}
```

**Campos:**

- `id` (int): Identificador do ingrediente.
- `nome` (string): Nome do ingrediente.
- `quantidadeEstoque` (float): Quantidade atual em estoque.
- `unidadeMedida` (string): Unidade de medida (ex: *kg*, *litros*).
- `custoUnitario` (float): Custo por unidade de medida.
- `estoqueMinimo` (float): Quantidade mínima antes de ser necessário reabastecer.

---

### 🧑‍💼 Garçom

```json
{
  "id": 2,
  "nome": "Carlos Silva",
  "email": "carlos@bar.com",
  "ativo": true,
  "vendasTotais": 1245.90
}
```

**Campos:**

- `id` (int): Identificador do garçom.
- `nome` (string): Nome completo.
- `email` (string): Email para contato.
- `ativo` (bool): Indica se o garçom está ativo no sistema.
- `vendasTotais` (float): Valor total de vendas associadas ao garçom.

---
