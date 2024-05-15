"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const Schmeas_1 = require("./models/Schmeas");
const uuid_1 = require("uuid");
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const server = (0, express_1.default)();
server.use((0, cors_1.default)());
server.use(express_1.default.json());
server.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const originalLink = yield Schmeas_1.URLS.findOne({
        id: id
    });
    res.redirect((originalLink === null || originalLink === void 0 ? void 0 : originalLink.url) || "");
}));
server.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const uniqueId = (0, uuid_1.v4)();
    const createdUrl = yield Schmeas_1.URLS.create({
        id: uniqueId,
        url: body.url
    });
    yield createdUrl.save();
    const newUrl = req.protocol + '://' + req.get('host') + '/' + uniqueId;
    res.json(newUrl);
}));
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log('server runs at: ', PORT);
});
