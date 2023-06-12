"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
var tasksRoute_1 = require("./tasksRoute");
exports.router = (0, express_1.Router)();
exports.router.use('/tasks', tasksRoute_1.tasksRoute);
