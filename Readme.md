Documentação dos Endpoints da API
Base URL
Todas as rotas da API são precedidas por http://localhost:3005/api/.

Autenticação

1. Registro de Usuário
   Método: POST
   Endpoint: /api/users/register
   Descrição: Cria um novo usuário no sistema.
   Corpo da Requisição:
   {
   "username": "seu-username",
   "password": "sua-senha"
   }
   Respostas:
   201 Created: Usuário criado com sucesso.
   json
   Copiar código
   {
   "message": "User created",
   "user": {
   "id": 1,
   "username": "seu-username"
   }
   }
   400 Bad Request: Falha na criação do usuário.
   json
   Copiar código
   {
   "error": "User creation failed"
   }
2. Login de Usuário
   Método: POST
   Endpoint: /api/users/login
   Descrição: Autentica um usuário e retorna um token JWT.
   Corpo da Requisição:
   json
   Copiar código
   {
   "username": "seu-username",
   "password": "sua-senha"
   }
   Respostas:
   200 OK: Usuário autenticado com sucesso.
   json
   Copiar código
   {
   "token": "JWT_TOKEN"
   }
   404 Not Found: Usuário não encontrado.
   json
   Copiar código
   {
   "message": "User not found"
   }
   401 Unauthorized: Credenciais inválidas.
   json
   Copiar código
   {
   "message": "Invalid credentials"
   }
3. Atualizar Senha
   Método: PUT
   Endpoint: /api/users/update
   Descrição: Atualiza a senha do usuário autenticado.
   Requer Autenticação (JWT):
   Cabeçalho:
   makefile
   Copiar código
   Authorization: Bearer JWT_TOKEN
   Corpo da Requisição:
   json
   Copiar código
   {
   "newPassword": "nova-senha"
   }
   Respostas:
   200 OK: Senha atualizada com sucesso.
   json
   Copiar código
   {
   "message": "Password updated"
   }
   404 Not Found: Usuário não encontrado.
   json
   Copiar código
   {
   "message": "User not found"
   } 4. Deletar Usuário
   Método: DELETE
   Endpoint: /api/users/delete
   Descrição: Deleta o usuário autenticado.
   Requer Autenticação (JWT):
   Cabeçalho:
   makefile
   Copiar código
   Authorization: Bearer JWT_TOKEN
   Respostas:
   200 OK: Usuário deletado com sucesso.
   json
   Copiar código
   {
   "message": "User deleted"
   }
   404 Not Found: Usuário não encontrado.
   json
   Copiar código
   {
   "message": "User not found"
   }
   Produtos

4. Listar Produtos
   Método: GET
   Endpoint: /api/products
   Descrição: Retorna a lista de todos os produtos.
   Respostas:
   200 OK: Lista de produtos.
   json
   Copiar código
   [
   {
   "id": 1,
   "name": "Produto 1",
   "price": 100.00,
   "stock": 10
   },
   {
   "id": 2,
   "name": "Produto 2",
   "price": 50.00,
   "stock": 20
   }
   ]
5. Criar Produto
   Método: POST
   Endpoint: /api/products
   Descrição: Cria um novo produto.
   Corpo da Requisição:
   json
   Copiar código
   {
   "name": "Nome do Produto",
   "price": 100.00,
   "stock": 10
   }
   Respostas:
   201 Created: Produto criado com sucesso.
   json
   Copiar código
   {
   "message": "Product created",
   "product": {
   "id": 1,
   "name": "Nome do Produto",
   "price": 100.00,
   "stock": 10
   }
   }
   400 Bad Request: Falha na criação do produto.
   json
   Copiar código
   {
   "error": "Product creation failed"
   }
   Clientes
6. Listar Clientes
   Método: GET
   Endpoint: /api/clients
   Descrição: Retorna a lista de todos os clientes.
   Respostas:
   200 OK: Lista de clientes.
   json
   Copiar código
   [
   {
   "id": 1,
   "name": "Cliente 1",
   "email": "cliente1@email.com"
   },
   {
   "id": 2,
   "name": "Cliente 2",
   "email": "cliente2@email.com"
   }
   ]
7. Criar Cliente
   Método: POST
   Endpoint: /api/clients
   Descrição: Cria um novo cliente.
   Corpo da Requisição:
   json
   Copiar código
   {
   "name": "Nome do Cliente",
   "email": "email@cliente.com"
   }
   Respostas:
   201 Created: Cliente criado com sucesso.
   json
   Copiar código
   {
   "message": "Client created",
   "client": {
   "id": 1,
   "name": "Nome do Cliente",
   "email": "email@cliente.com"
   }
   }
   400 Bad Request: Falha na criação do cliente.
   json
   Copiar código
   {
   "error": "Client creation failed"
   }
   Fabricantes
8. Listar Fabricantes
   Método: GET
   Endpoint: /api/manufacturers
   Descrição: Retorna a lista de todos os fabricantes.
   Respostas:
   200 OK: Lista de fabricantes.
   json
   Copiar código
   [
   {
   "id": 1,
   "name": "Fabricante 1"
   },
   {
   "id": 2,
   "name": "Fabricante 2"
   }
   ]
9. Criar Fabricante
   Método: POST
   Endpoint: /api/manufacturers
   Descrição: Cria um novo fabricante.
   Corpo da Requisição:
   json
   Copiar código
   {
   "name": "Nome do Fabricante"
   }
   Respostas:
   201 Created: Fabricante criado com sucesso.
   json
   Copiar código
   {
   "message": "Manufacturer created",
   "manufacturer": {
   "id": 1,
   "name": "Nome do Fabricante"
   }
   }
   400 Bad Request: Falha na criação do fabricante.
   json
   Copiar código
   {
   "error": "Manufacturer creation failed"
   }
   Pedidos
10. Listar Pedidos
    Método: GET
    Endpoint: /api/orders
    Descrição: Retorna a lista de todos os pedidos.
    Respostas:
    200 OK: Lista de pedidos.
    json
    Copiar código
    [
    {
    "id": 1,
    "clientId": 1,
    "productId": 1,
    "quantity": 2,
    "totalPrice": 200.00
    }
    ]
11. Criar Pedido
    Método: POST
    Endpoint: /api/orders
    Descrição: Cria um novo pedido.
    Corpo da Requisição:
    json
    Copiar código
    {
    "clientId": 1,
    "productId": 1,
    "quantity": 2,
    "totalPrice": 200.00
    }
    Respostas:
    201 Created: Pedido criado com sucesso.
    json
    Copiar código
    {
    "message": "Order created",
    "order": {
    "id": 1,
    "clientId": 1,
    "productId": 1,
    "quantity": 2,
    "totalPrice": 200.00
    }
    }
    400 Bad Request: Falha na criação do pedido.
    json
    Copiar código
    {
    "error": "Order creation failed"
    }

Authorization: Bearer YOUR_JWT_TOKEN
