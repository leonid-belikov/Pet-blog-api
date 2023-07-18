"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var toolSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true }
});
var ToolModel = (0, mongoose_1.model)('Tool', toolSchema);
exports.default = ToolModel;
