# *Documentação da API*

## *Rotas de Produtos*

---

### *1. Listar Produtos*
*Endpoint:* `GET /user/category/:categoryid/product`   

*Descrição:* Retorna os produtos de uma categoria específica ou todos os produtos, caso o categoryid seja "all".  

**Requer Autenticação:** Sim.  

#### *Parâmetros da URL*
- `categoryid (string)`: ID da categoria ou "all".

#### *Resposta de Sucesso:* `(200)`
```json
[
  {
    "id": "string",
    "categoryId": "string",
    "name": "string",
    "description": "string",
    "quantity": "number"
  }
]
```
**Erros Possíveis**
`500`: Erro interno no servidor.

## *2. Criar Produto*
*Endpoint:* `POST /user/category/:categoryid/product`

*Descrição:* Cria um novo produto em uma categoria específica.

**Requer Autenticação:** Sim.

#### *Parâmetros da URL*
`categoryid (string)`: ID da categoria.
#### *Request Body*
```json
{
  "name": "string",
  "description": "string",
  "quantity": "number"
}
```
#### *Resposta de Sucesso:* `(201)`
```json
{
  "message": "Product created"
}
```
**Erros Possíveis**
- `400`: ID da categoria é obrigatório.
- `500`: Erro interno no servidor.
## *3. Atualizar Produto*
*Endpoint:* `PUT /user/category/:categoryid/product/:productid`

*Descrição:* Atualiza as informações de um produto em uma categoria específica.

**Requer Autenticação:** Sim.

#### *Parâmetros da URL*
`categoryid (string)`: ID da categoria.

`productid (string)`: ID do produto.

#### *Request Body*
```json
{
  "name": "string",
  "description": "string",
  "quantity": "number"
}
```
Resposta de Sucesso: `(200)`
```json
{
  "message": "Product updated"
}
```
**Erros Possíveis**
- `400`: IDs do produto e da categoria são obrigatórios.
- `500`: Erro interno no servidor.

## *4. Deletar Produto*
*Endpoint:* `DELETE /user/category/:categoryid/product/:productid`
*Descrição:* Remove um produto específico de uma categoria.
**Requer Autenticação:** Sim.

Parâmetros da URL
`categoryid (string)`: ID da categoria.
`productid (string)`: ID do produto.
Resposta de Sucesso: `(200)`
```json
{
  "message": "Product deleted"
}
```
**Erros Possíveis**
- `400`: IDs do produto e da categoria são obrigatórios.
- `500`: Erro interno no servidor.