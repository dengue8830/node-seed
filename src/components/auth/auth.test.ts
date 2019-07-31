import { server } from '../../server';
import { http } from '../../common/http';
import { ISession } from './session';
http.setBaseUrl(`http://localhost:${server.address().port}`);

describe('auth', () => {
  describe('guest', () => {
    let token: string;

    test('it should be able to get a guest token', async () => {
      const res = await http.get('/apis/test/guestToken');
      expect(res.data).toHaveProperty('token');
      token = res.data.token;
    });

    test('guest token should be able to access to a protected api', async () => {
      http.setCredentials(token);
      const res = await http.get<{ session: ISession }>('/apis/test/protectedGuest');
      expect(res.data.session.user.isGuest).toEqual(true);
      expect(res.data.session.user.isRoot).toEqual(false);
      expect(res.data.session.user.id).toBeUndefined();
    });

    test('guest token shouldnt be able to access to a root admin api', async () => {
      try {
        await http.get('/apis/test/protectedRoot');
      } catch (error) {
        expect(1).toEqual(1);
        return;
      }
      expect(1).toEqual(2);
    });
  });

  describe('root', () => {
    let token: string;

    test('it should be able to get a root token', async () => {
      const res = await http.get('/apis/test/rootToken');
      expect(res.data).toHaveProperty('token');
      token = res.data.token;
    });

    test('root token should be able to access to a root protected api', async () => {
      http.setCredentials(token);
      const res = await http.get<{ session: ISession }>('/apis/test/protectedRoot');
      expect(res.data.session.user.isGuest).toEqual(false);
      expect(res.data.session.user.isRoot).toEqual(true);
      expect(res.data.session.user.id).toEqual('1');
    });

    test('root token should be able to access to a guest protected api', async () => {
      http.setCredentials(token);
      const res = await http.get<{ session: ISession }>('/apis/test/protectedGuest');
      expect(res.data.session.user.isGuest).toEqual(false);
      expect(res.data.session.user.isRoot).toEqual(true);
      expect(res.data.session.user.id).toEqual('1');
    });
  });

  afterAll(done => server.close(done));
});