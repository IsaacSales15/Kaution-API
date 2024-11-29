
---

### **API_DOCUMENTATION.md**

# **Documentação da API**

## **Rotas de Usuário**

### **1. Criar Usuário**
**Endpoint:** `POST /user/create`  
**Descrição:** Cria um novo usuário.  

#### **Request Body**  
```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "namertag": "string"
}

```
**Resposta de Sucesso:** `(201)`

```json
{
  "name": "string",
  "email": "string",
  "id": "string",
  "createdAt": "datetime"
}

```

**Erros Possíveis:**

- `400:` Nome, email, senha ou namertag ausente ou usuário já existente.

- `500:` Erro interno no servidor.

### **2. Login do Usuário**
**Endpoint:** `POST /user/login`

**Descrição:** Realiza o login do usuário e retorna um token de autenticação.

### **Request Body**
```json
{
  "email": "string",
  "password": "string"
}
```

**Resposta de Sucesso:** `(200)`

```json
{
  "userID": "string",
  "token": "string",
  "message": "Login successful"
}
```

**Erros Possíveis:**
- `400:` Email/senha ausente, usuário não encontrado, não verificado ou senha inválida.
- `500:` Erro interno no servidor.

### **3. Obter Perfil do Usuário**

**Endpoint:** `GET /user/profile/:userId`

**Descrição:** Retorna as informações do perfil de um usuário específico.

**Requer Autenticação:** Sim (middleware authMiddleware).

**Parâmetros da URL**
- `userId` (string): ID do usuário.

**Resposta de Sucesso:** `(200)`
```json
{
  "id": "string",
  "name": "string",
  "email": "string",
  "createdAt": "datetime",
  "updateAt": "datetime",
  "inventoryAccess": [
    {
      "role": "string",
      "inventory": {
        "name": "string"
      }
    }
  ]
}
```
**Erros Possíveis**

- `500:` Erro interno no servidor.

### **4. Atualizar Perfil do Usuário**
**Endpoint:**: `PUT /user/profile/put-user/:userId`

**Descrição:** Atualiza o nome do usuário.
Requer Autenticação: Sim (middleware authMiddleware).

**Parâmetros da URL**
- `userId` (string): ID do usuário.

**Request Body**

```json
{
  "name": "string"
}
```
**Resposta de Sucesso:** `(200)`
```json
{
  "success": true,
  "user": {
    "name": "string",
    "id": "string",
    "updateAt": "datetime"
  }
}
```
**Erros Possíveis**
- `500:` Erro interno no servidor.

### **5. Atualizar Senha**
**Endpoint:** `PUT /user/profile/put-password/:userId`

**Descrição:** Atualiza a senha do usuário.
Requer Autenticação: Sim (middleware authMiddleware).

**Parâmetros da URL**
- `userId` (string): ID do usuário.
**Request Body**
```json
{
  "password": "string"
}
```
**Resposta de Sucesso:** `(200)`
```json
{
  "updateAt": "datetime"
}
```
**Erros Possíveis**
- `500:` Erro interno no servidor.

## **6. Deletar Usuário**
**Endpoint:** `DELETE /user/delete/:userId`
**Descrição:** Remove um usuário do sistema.

**Parâmetros da URL**
- `userId` (string): ID do usuário.
**Resposta de Sucesso:** `(200)`
```json
{
  "count": "number"
}

```
**Erros Possíveis**
- `500:` Erro interno no servidor.
