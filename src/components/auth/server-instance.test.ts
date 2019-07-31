import { server } from '../../server';
import { http } from '../../common/http';
http.setBaseUrl(`http://localhost:${server.address().port}`);

// Here we check if we can deploy multiple test files with server access without architecture problems
describe('server instance doesnt throw "address already in use" problem', () => {
  test('gets another token', async () => {
    const res = await http.get('/apis/test/guestToken');
    expect(res.data).toHaveProperty('token');
  });

  afterAll(done => server.close(done));
});