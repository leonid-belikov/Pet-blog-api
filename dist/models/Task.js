"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var taskSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    executor: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: 'Employee' },
    status: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: 'Status' },
    tools: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Tool' }]
});
var TaskModel = (0, mongoose_1.model)('Task', taskSchema);
exports.default = TaskModel;
