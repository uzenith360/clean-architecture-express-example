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
const project_datasource_interface_1 = __importDefault(require("../../interfaces/datasources/project.datasource.interface"));
const utils_1 = __importDefault(require("@uzenith360/utils"));
const mongodb_1 = require("mongodb");
const project_status_enum_1 = __importDefault(require("../../../domain/project-status.enum"));
class MongoDBProjectDatasource extends project_datasource_interface_1.default {
    constructor(database) {
        super();
        this.database = database;
    }
    createOne(project) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.database.insertOne(MongoDBProjectDatasource._mapEntityToData(project));
            return result !== null;
        });
    }
    countOverdue(startDate, endDate) {
        const match = {
            deletedAt: null,
            status: { $ne: project_status_enum_1.default.completed },
            dueDate: { $lte: new Date() },
        };
        if (!!startDate) {
            match['createdAt'] = { $gte: new Date(startDate) };
        }
        if (!!endDate) {
            match['createdAt'] = { $lte: new Date(endDate) };
        }
        return this.database.count(match);
    }
    getStats(startDate, endDate) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const match = { deletedAt: null };
            if (!!startDate) {
                match['createdAt'] = { $gte: new Date(startDate) };
            }
            if (!!endDate) {
                match['createdAt'] = { $lte: new Date(endDate) };
            }
            const stats = yield this.database.join([
                {
                    $match: match
                },
                { $sortByCount: "$status" },
                { $project: { status: "$_id", count: 1, _id: 0 } }
            ]);
            return (_a = stats === null || stats === void 0 ? void 0 : stats.reduce((acc, { status, count }) => (Object.assign(Object.assign({}, acc), { [status]: !!acc[status] ? (acc[status] + count) : count })), {})) !== null && _a !== void 0 ? _a : null;
        });
    }
    getAll(page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const { limit: take, toSkip: skip } = utils_1.default.getPaginationParameters(page, limit);
            const projects = yield this.database.join([
                {
                    $match: { deletedAt: null }
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "assigneeIds",
                        foreignField: "_id",
                        as: "users"
                    }
                },
                { $skip: skip },
                { $limit: take },
            ]);
            return (_a = projects === null || projects === void 0 ? void 0 : projects.map((project) => MongoDBProjectDatasource._mapDataToEntity(project))) !== null && _a !== void 0 ? _a : [];
        });
    }
    getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const projects = yield this.database.join([
                {
                    $match: { _id: new mongodb_1.ObjectId(id), deletedAt: null }
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "assigneeIds",
                        foreignField: "_id",
                        as: "users"
                    }
                },
                { $limit: 1 },
            ]);
            const projectsWithUsers = projects === null || projects === void 0 ? void 0 : projects[0];
            return !!projectsWithUsers ? MongoDBProjectDatasource._mapDataToEntity(projectsWithUsers) : null;
        });
    }
    updateOne(id, project) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.database.updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: MongoDBProjectDatasource._mapEntityToData(project) });
            return result !== null;
        });
    }
    addAssigneeId(id, assigneeId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.database.updateOne({ _id: new mongodb_1.ObjectId(id) }, { $push: { assigneeIds: assigneeId } }, { upsert: false });
            return result !== null;
        });
    }
    addAttachment(id, attachment) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.database.updateOne({ _id: new mongodb_1.ObjectId(id) }, { $push: { attachments: attachment } }, { upsert: false });
            return result !== null;
        });
    }
    addTask(id, task) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.database.updateOne({ _id: new mongodb_1.ObjectId(id) }, { $push: { tasks: task } }, { upsert: false });
            return result !== null;
        });
    }
    removeAssigneeId(id, assigneeId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.database.updateOne({ _id: new mongodb_1.ObjectId(id) }, { $pull: { assigneeIds: new mongodb_1.ObjectId(assigneeId) } });
            return result !== null;
        });
    }
    removeAttachment(id, attachmentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.database.updateOne({ _id: new mongodb_1.ObjectId(id) }, { $pull: { attachments: { _id: new mongodb_1.ObjectId(attachmentId) } } });
            return result !== null;
        });
    }
    removeTask(id, taskId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.database.updateOne({ _id: new mongodb_1.ObjectId(id) }, { $pull: { tasks: { _id: new mongodb_1.ObjectId(taskId) } } });
            return result !== null;
        });
    }
    setTaskStatus(id, taskId, status) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.database.updateOne({ _id: new mongodb_1.ObjectId(id), "tasks._id": new mongodb_1.ObjectId(taskId) }, { $set: { tasks: { "tasks.$.status": status } } });
            return result !== null;
        });
    }
}
exports.default = MongoDBProjectDatasource;
