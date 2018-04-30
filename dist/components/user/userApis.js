"use strict";
/**
 * Component that handles token generation and related stuffs (login, logout, etc.)
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("./user");
const connection_1 = require("../../common/connection");
const sequelize_1 = require("sequelize");
const router = express_1.Router();
/**
 * Client request a token to operate on protected apis.
 * Changes this with your login logic.
 */
router.get('/api/users/v1', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const users = yield user_1.User.findAll();
    res.json({ users });
}));
router.get('/secret/syncforce', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    yield connection_1.default.sync({ force: true });
    yield user_1.User.create({ email: 'xxx' });
    const user = yield user_1.User.findOne({
        where: {
            email: {
                [sequelize_1.Op.or]: ['xxx', 'yyy']
            }
        }
    });
    console.log(!!user);
    yield user.destroy();
    res.json({ status: 'ok' });
}));
exports.default = router;
//# sourceMappingURL=userApis.js.map