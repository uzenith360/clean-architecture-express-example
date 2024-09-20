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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_datasource_interface_1 = __importDefault(require("../../interfaces/datasources/user.datasource.interface"));
const utils_1 = __importDefault(require("@uzenith360/utils"));
const mongodb_1 = require("mongodb");
class MongoDBUserDatasource extends user_datasource_interface_1.default {
    constructor(database) {
        super();
        this.database = database;
    }
    createOne(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.database.insertOne(MongoDBUserDatasource._mapEntityToData(user));
            return result !== null;
        });
    }
    getAll(page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const { toSkip: skip } = utils_1.default.getPaginationParameters(page, limit);
            const users = yield this.database.find({ deletedAt: null }, { limit, skip });
            return users.map((user) => MongoDBUserDatasource._mapDataToEntity(user));
        });
    }
    getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.database.findOne({ _id: new mongodb_1.ObjectId(id), deletedAt: null });
            return user && MongoDBUserDatasource._mapDataToEntity(user);
        });
    }
    updateOne(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.database.updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: MongoDBUserDatasource._mapEntityToData(user) });
            return result !== null;
        });
    }
}
exports.default = MongoDBUserDatasource;
