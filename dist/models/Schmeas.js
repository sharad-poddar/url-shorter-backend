"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.URLS = void 0;
const mongodb_1 = require("mongodb");
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
mongoose_1.default.connect(process.env.DB_URL || "").then(() => {
    console.log('your schemas is connected to mongoDB');
});
const urlSchema = new mongoose_1.default.Schema({
    id: mongodb_1.UUID,
    url: String,
});
exports.URLS = mongoose_1.default.model('url', urlSchema);
