"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var taskSchema = new mongoose_1.Schema({
    name: { type: String, required: true }
});
var TaskModel = (0, mongoose_1.model)('Task', taskSchema);
exports.default = TaskModel;
