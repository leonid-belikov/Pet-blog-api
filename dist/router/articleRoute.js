"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.articleRoute = void 0;
var express_1 = require("express");
exports.articleRoute = (0, express_1.Router)();
exports.articleRoute.get('/', function (req, res) {
    res.send({ msg: 'Yoyoyo2' });
});
exports.articleRoute.post('/', function (req, res) {
    res.send({ msg: 'Yoyoyo2 post' });
});
