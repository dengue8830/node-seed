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
const nodeMailer = require("nodemailer");
const util_1 = require("util");
const ejs = require("ejs");
const config_1 = require("../../common/config");
class MailService {
    constructor() {
        this.transporter = nodeMailer.createTransport({
            service: 'gmail',
            auth: {
                user: config_1.default.getEmailServerUser(),
                pass: config_1.default.getEmailServerPass()
            }
        });
        this.renderFileAsync = util_1.promisify(ejs.renderFile).bind(ejs);
        this.sendmailAsync = util_1.promisify(this.transporter.sendMail).bind(this.transporter);
    }
    sendMail(options) {
        return __awaiter(this, void 0, void 0, function* () {
            options.from = options.from ? options.from : config_1.default.getEmailServerUser();
            yield this.sendmailAsync(options);
        });
    }
    sendTemplateMail(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const html = yield this.renderFileAsync(options.templatePath, options.templateParams);
            options.mailOptions.html = html;
            yield this.sendMail(options.mailOptions);
        });
    }
}
exports.default = new MailService();
//# sourceMappingURL=mailService.js.map