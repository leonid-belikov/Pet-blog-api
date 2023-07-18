"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var Status;
(function (Status) {
    Status["TODO"] = "To do";
    Status["PROGRESS"] = "Progress";
    Status["DONE"] = "Done";
})(Status || (Status = {}));
var statusSchema = new mongoose_1.Schema({
    name: { type: String, required: true }
});
var StatusModel = (0, mongoose_1.model)('Status', statusSchema);
exports.default = StatusModel;
