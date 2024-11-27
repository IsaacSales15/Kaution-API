# *Documentação da API*

## *Rotas de Inventário*

---

### *1. Listar Inventários*
*Endpoint:* `GET /user/:userid/inventory`

*Descrição:* Retorna os inventários de um usuário ou todos os inventários, caso o userid seja "all".  

**Requer Autenticação:** Sim.  

#### *Parâmetros da URL*
- `userid (string)`: ID do usuário ou "all".

#### *Resposta de Sucesso:* `(200)`
```json
[
  {
    "id": "string",
    "userId": "string",
    "name": "string",
    "createdAt": "datetime",
    "updateAt": "datetime"
  }
]
```
**Erros Possíveis**
- `500:` Erro interno no servidor.

### *2. Criar Inventário*
*Endpoint:* `POST /user/:userid/inventory`

*Descrição:* Cria um novo inventário para o usuário.

**Requer Autenticação:** Sim.

### *Parâmetros da URL*
- `userid (string)`: ID do usuário.

### *Request Body*
```json

{
  "name": "string"
}
```
#### *Resposta de Sucesso:* `(201)`

```json
{
  "message": "Inventory created"
}
```

**Erros Possíveis**
- `400:` ID do usuário é obrigatório.
- `500:` Erro interno no servidor.

### *3. Atualizar Inventário*

*Endpoint:* `PUT /user/inventory/:inventoryid`

*Descrição:* Atualiza o nome de um inventário.

**Requer Autenticação:** Sim.

### *Parâmetros da URL*
`inventoryid (string):` ID do inventário.
### *Request Body*
```json

{
  "name": "string"
}
```
*Resposta de Sucesso:* `(200)`

```json
{
  "message": "Inventory updated"
}
```
**Erros Possíveis**
- `400:` ID do inventário é obrigatório.
- `500:` Erro interno no servidor.

### *4. Deletar Inventário*
*Endpoint:* `DELETE /user/inventory/:inventoryid`

*Descrição:* Remove um inventário específico pelo ID.

**Requer Autenticação:** Sim.

### *Parâmetros da URL*
`inventoryid (string):` ID do inventário.

*Resposta de Sucesso:* `(200)`
```json
{
  "message": "Inventory deleted"
}
```
**Erros Possíveis**
- `400:` ID do inventário é obrigatório.
- `500:` Erro interno no servidor.

5. Deletar Todos os Inventários
*Endpoint:* `DELETE /user/inventories/deleteAll`

*Descrição:* Remove todos os inventários cadastrados.

**Requer Autenticação:** Sim.

Resposta de Sucesso: (200)
```json
{
  "message": "All inventories have been deleted successfully"
}
```
**Erros Possíveis**
`500:` Erro interno no servidor.