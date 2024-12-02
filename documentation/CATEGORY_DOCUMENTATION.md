

# **Documentação da API**
## *Rotas de Categorias* 
### **1. Listar Categorias**

*Endpoint:* `GET /user/:inventoryid/category`

*Descrição:* Retorna as categorias de um inventário específico ou todas as categorias, caso o inventoryid seja "all".

**Requer Autenticação:** Sim.

#### *Parâmetros da URL:*

`inventoryid (string)`: ID do inventário ou "all".

#### *Resposta de Sucesso:*

**Status:** `200 OK`
```json
[
  {
    "id": "string",
    "inventoryId": "string",
    "name": "string",
    "description": "string",
    "createdAt": "string",
    "updateAt": "string"
  }
]
```
**Erros Possíveis:**

- `500 Internal Server Error`:  Erro interno no servidor.


### ***2. Criar Categoria***
*Endpoint:* `POST /user/:inventoryid/category`

*Descrição:* Cria uma nova categoria em um inventário específico.

**Requer Autenticação:** Sim.

#### *Parâmetros da URL:*

`inventoryid (string)`: ID do inventário.
Corpo da Requisição:

``` json
{
  "name": "string",
  "description": "string"
}
```

#### *Resposta de Sucesso:*

Status: `201 Created`

```json
{
  "message": "Category created"
}
```
**Erros Possíveis:**

- `400 Bad Request`: ID do inventário é obrigatório.

- `500 Internal Server Error`: Erro interno no servidor.


### ***3. Deletar Categoria***
*Endpoint:* `DELETE /user/category/:categoryid`

*Descrição:* Remove uma categoria específica e seus produtos associados.

**Requer Autenticação:**  Sim.

#### *Parâmetros da URL:*

`categoryid (string)`: ID da categoria.

#### *Resposta de Sucesso:*

Status: `200 OK`
```json
{
  "message": "Category deleted"
}
```
**Erros Possíveis:**

- `400 Bad Request`: ID da categoria é obrigatório.
- `500 Internal Server Error`: Erro interno no servidor.
### ***4. Atualizar Categoria***
*Endpoint:* `PUT /user/category/:categoryid`

*Descrição:* Atualiza as informações de uma categoria específica.

**Requer Autenticação:** Sim.

#### *Parâmetros da URL:*

`categoryid (string)`: ID da categoria.

```json
{
  "name": "string",
  "description": "string"
}
```
#### *Resposta de Sucesso:* 

Status: `200 OK`
```json
{
  "message": "Category updated"
}
```
**Erros Possíveis:**

- `400 Bad Request`: ID da categoria é obrigatório.

- `500 Internal Server Error`: Erro interno no servidor.