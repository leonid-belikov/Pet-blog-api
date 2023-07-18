"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var employeeSchema = new mongoose_1.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    image: { type: String }
});
var EmployeeModel = (0, mongoose_1.model)('Employee', employeeSchema);
exports.default = EmployeeModel;
