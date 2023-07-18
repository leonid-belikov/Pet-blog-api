"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toolsRouter = void 0;
var express_1 = require("express");
var Tool_1 = __importDefault(require("../models/Tool"));
var helpers_1 = require("../helpers");
exports.toolsRouter = (0, express_1.Router)();
exports.toolsRouter.get('/', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var page, filterObject, limit, dataPromise, totalPromise, result, data, total, obj, obj, query, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                page = req.query.page ? Number(req.query.page) : undefined;
                filterObject = {};
                if (!page) return [3 /*break*/, 2];
                limit = 10;
                dataPromise = Tool_1.default.find(filterObject, null, { skip: (page - 1) * limit, limit: limit });
                totalPromise = Tool_1.default.find(filterObject).estimatedDocumentCount();
                return [4 /*yield*/, Promise.allSettled([
                        dataPromise,
                        totalPromise
                    ])];
            case 1:
                result = _a.sent();
                data = [], total = 0;
                if (result[0].status === 'fulfilled') {
                    obj = result[0];
                    data = obj.value;
                }
                if (result[1].status === 'fulfilled') {
                    obj = result[1];
                    total = obj.value;
                }
                res.json({ data: data, meta: { total: total } });
                return [2 /*return*/];
            case 2: return [4 /*yield*/, Tool_1.default.find(filterObject)];
            case 3:
                query = _a.sent();
                res.json(query);
                return [3 /*break*/, 5];
            case 4:
                err_1 = _a.sent();
                next(err_1);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
exports.toolsRouter.get('/:id', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, query, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, Tool_1.default.findById(id)];
            case 1:
                query = _a.sent();
                res.json(query);
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                next(err_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.toolsRouter.post('/', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, description, tool, err_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, name = _a.name, description = _a.description;
                tool = new Tool_1.default({ name: name, description: description });
                return [4 /*yield*/, tool.save()];
            case 1:
                _b.sent();
                res.json(tool);
                return [3 /*break*/, 3];
            case 2:
                err_3 = _b.sent();
                next(err_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.toolsRouter.put('/:id', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, updatedFields, updatedTool, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                updatedFields = (0, helpers_1.getUpdatedFields)(req.body, ['name', 'description']);
                return [4 /*yield*/, Tool_1.default.findByIdAndUpdate(id, { $set: updatedFields }, { returnDocument: 'after' })];
            case 1:
                updatedTool = _a.sent();
                res.json(updatedTool);
                return [3 /*break*/, 3];
            case 2:
                err_4 = _a.sent();
                next(err_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.toolsRouter.delete('/:id', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, deletedTool, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, Tool_1.default.findByIdAndDelete(id)];
            case 1:
                deletedTool = _a.sent();
                res.json(deletedTool);
                return [3 /*break*/, 3];
            case 2:
                err_5 = _a.sent();
                next(err_5);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
