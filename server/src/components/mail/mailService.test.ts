import 'mocha';
import * as chai from 'chai';
import mailService from './mailService';
// import ChaiHttp = require('chai-http');
// import server from '../../server';
const expect = chai.expect;
// chai.use(ChaiHttp);

describe('mail', () => {

    describe('basics mails', () => {

        it('send a simple mail', async () => {
            return await mailService.sendMail({
                to: 'dengue8830@gmail.com',
                text: 'this is a simple mail'
            });
        });

        it('send a template mail', async () => {
            return await mailService.sendTemplateMail({
                mailOptions: {
                    to: 'dengue8830@gmail.com'
                },
                templateParams: { name: 'david' },
                templatePath: __dirname + '/templates/welcome.ejs'
            });
        });
    });

});