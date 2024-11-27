### **API_DOCUMENTATION.md**

# *Documentação da API*

## *Rotas de Verificação*

### *1. Verificar Código*
*Endpoint:* `POST /user/verify`  
*Descrição:* Verifica o código de ativação do usuário.  

#### *Request Body*
```json
{
  "email": "string",
  "code": "string"
}
```
**Resposta de Sucesso:** `(200)`

```json
{
  "success": true,
  "token": "string"
}
```
**Erros Possíveis**

- `400:` Código inválido ou expirado.

- `400:` Usuário não encontrado.

- `500:` Erro interno no servidor.

### *2. Reenviar Código de Verificação*
*Endpoint:* `POST /user/verify/resend`

*Descrição:* Reenvia o código de ativação para o e-mail do usuário.

Request Body
```json
{
  "email": "string"
}
```
**Resposta de Sucesso:** `(200)`

```json
{
  "success": true
}
```
**Erros Possíveis**
- `400:` Usuário não encontrado.
- `500:` Erro interno no servidor.
