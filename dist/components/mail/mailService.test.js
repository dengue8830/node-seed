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
const mailService_1 = require("./mailService");
// import ChaiHttp = require('chai-http');
// import server from '../../server';
const expect = chai.expect;
// chai.use(ChaiHttp);
/**
 * We skip this tests because we don't have an mail config in config/development.json.
 * We should have a development mail account to use on this tests. But this is only a
 * seed project, create a devlopment mail account or use the only one you have or
 * let this tests skipped.
 */
describe.skip('mail', () => {
    describe('basics mails', () => {
        it('send a simple mail', () => __awaiter(this, void 0, void 0, function* () {
            return yield mailService_1.default.sendMail({
                to: 'dengue8830@gmail.com',
                text: 'this is a simple mail'
            });
        }));
        it('send a template mail', () => __awaiter(this, void 0, void 0, function* () {
            return yield mailService_1.default.sendTemplateMail({
                mailOptions: {
                    to: 'dengue8830@gmail.com'
                },
                templateParams: { name: 'david' },
                templatePath: __dirname + '/templates/welcome.ejs'
            });
        }));
    });
});
//# sourceMappingURL=mailService.test.js.map