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
const express_1 = require("express");
const socket_1 = require("./socket");
const logger_1 = require("../../common/logger");
const router = express_1.Router();
router.get('/api/chat/v1', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    logger_1.default.info(`por api ${req.query.message}`);
    socket_1.default.sendMessage(req.query.message);
    res.json({ status: 'ok' });
}));
exports.default = router;
//# sourceMappingURL=chatApis.js.map