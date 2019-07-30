import { server } from '../../server';
import { http } from '../../common/http';
http.setBaseUrl(`http://localhost:${server.address().port}`);

describe('auth', () => {
  describe('token', () => {
    let token: string;

    test('gets a token', async () => {
      const res = await http.get('/apis/v1/token');
      expect(res.data).toHaveProperty('token');
      token = res.data.token;
    });

    test('use the token to acces to a protected api', async () => {
      http.setCredentials(token);
      const res = await http.get('/apis/v1/protected');
      expect(res.data).toHaveProperty('status');
      expect(res.data.status).toEqual('listorti');
    });
  });

  afterAll(done => server.close(done));
});