import { mailService } from './mail.service';

/**
 * We skip this tests because we don't have an mail config in config/development.json.
 * We should have a development mail account to use on this tests. But this is only a
 * seed project, create a devlopment mail account or use the only one you have or
 * let this tests skipped.
 */
describe.skip('mail', () => {

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