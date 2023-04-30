"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var router_1 = require("./router");
dotenv_1.default.config();
var app = (0, express_1.default)();
var port = process.env.SERVER_PORT;
app.use(body_parser_1.default.urlencoded());
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.use('/api', router_1.router);
app.listen(port, function () {
    console.log("Server is running at localhost:".concat(port));
});
