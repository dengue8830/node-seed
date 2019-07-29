import * as nodeMailer from 'nodemailer';
import { Transporter } from 'nodemailer';
import { MailOptions } from 'nodemailer/lib/stream-transport';
import { promisify } from 'util';
import * as ejs from 'ejs';
import config from '../../common/config';
// import { Mail } from 'nodemailer';

interface TemplateMail {
  mailOptions: MailOptions;
  templatePath: string;
  templateParams: any;
}

class MailService {
  private transporter: Transporter;
  private renderFileAsync: Function;
  private sendmailAsync: Function;

  constructor() {
    this.transporter = nodeMailer.createTransport({
      service: 'gmail',
      auth: {
        user: config.getEmailServerUser(),
        pass: config.getEmailServerPass()
      }
    });
    this.renderFileAsync = promisify(ejs.renderFile).bind(ejs);
    this.sendmailAsync = promisify(this.transporter.sendMail).bind(this.transporter);
  }

  async sendMail(options: MailOptions) {
    options.from = options.from ? options.from : config.getEmailServerUser();
    await this.sendmailAsync(options);
  }

  async sendTemplateMail(options: TemplateMail) {
    const html = await this.renderFileAsync(options.templatePath, options.templateParams);
    options.mailOptions.html = html;
    await this.sendMail(options.mailOptions);
  }
}

export default new MailService();