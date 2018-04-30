"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const chai = require("chai");
// import chaiHttp from 'chai-http';
const ChaiHttp = require("chai-http");
const server_1 = require("../../server");
const expect = chai.expect;
chai.use(ChaiHttp);
// chai.should();
const agent = chai.request.agent(server_1.default);
describe('auth', () => {
    describe('token', () => {
        let token;
        it('gets a token', () => __awaiter(this, void 0, void 0, function* () {
            const res = yield agent.get('/api/v1/token');
            // res.body.should.have.property('token');
            expect(res.body).have.property('token');
            token = res.body.token;
        }));
        it('use the token to acces to a protected api', () => __awaiter(this, void 0, void 0, function* () {
            const res = yield agent.get('/api/v1/protected').set('Authorization', `bearer ${token}`);
            // res.body.should.have.property('status').equals('listorti');
            expect(res.body).have.property('status').equals('listorti');
        }));
    });
});
//# sourceMappingURL=auth.test.js.map