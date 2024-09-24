const request= require('supertest');
const app =  require('../index'); // Importando a aplicação Express

describe('User Registration API', () => {
  it('Deve registrar um novo usuário', async () => {
    const res = await request(app)
      .post('/api/users/register')
      .send({
        username: 'usuarioTeste',
        password: 'senhaSegura123',
        email: "userteste@email.com.br"

      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('message', 'User created');
    expect(res.body).toHaveProperty('user');
    expect(res.body.user).toHaveProperty('username', 'usuarioTeste');
  });

  it('Deve retornar erro ao tentar registrar um usuário sem nome de usuário ou senha', async () => {
    const res = await request(app)
      .post('/api/users/register')
      .send({
        username: '',  // Usuário vazio
        password: '',   // Senha vazia
        email:''
      });

    expect(res.statusCode).toEqual(400); // Espera erro de validação
    expect(res.body).toHaveProperty('error', 'User creation failed');
  });
});
