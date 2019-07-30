import { server } from '../../server';
import { http } from '../../common/http';
http.setBaseUrl(`http://localhost:${server.address().port}`);

describe('server instance doesnt throw "address already in use" problem', () => {
  test('gets another token', async () => {
    const res = await http.get('/apis/v1/token');
    expect(res.data).toHaveProperty('token');
  });

  afterAll(done => server.close(done));
});