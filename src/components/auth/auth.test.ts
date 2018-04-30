import 'mocha';
import * as chai from 'chai';
// import chaiHttp from 'chai-http';
import ChaiHttp = require('chai-http');
import server from '../../server';
const expect = chai.expect;
chai.use(ChaiHttp);
// chai.should();

const agent = chai.request.agent(server);

describe('auth', () => {

    describe('token', () => {
        let token: string;

        it('gets a token', async () => {
            const res: ChaiHttp.Response = await agent.get('/api/v1/token');
            // res.body.should.have.property('token');
            expect(res.body).have.property('token');
            token = res.body.token;
        });

        it('use the token to acces to a protected api', async () => {
            const res: any = await agent.get('/api/v1/protected').set('Authorization', `bearer ${token}`);
            // res.body.should.have.property('status').equals('listorti');
            expect(res.body).have.property('status').equals('listorti');
        });
    });

});