"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUpdatedFields = void 0;
function getUpdatedFields(body, checkList) {
    var result = {};
    checkList.forEach(function (field) {
        if (field in body)
            result[field] = body[field];
    });
    return result;
}
exports.getUpdatedFields = getUpdatedFields;
