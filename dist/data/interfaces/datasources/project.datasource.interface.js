"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const utils_1 = __importDefault(require("@uzenith360/utils"));
const user_datasource_interface_1 = __importDefault(require("./user.datasource.interface"));
/**
 * Like database operations/operations directly on the data-source (database, file, memory, network etc)
 * Pass in the parameters, that will be interpreted to database specific parameters
 * Dont pass in database/data-source specific parameters here!!!
**/
// This serves as an interface, i wanted to get static methods but couldn't do that with typescript interface
class ProjectDataSourceInterface {
    static _mapDataToEntity(project) {
        const { _id, createdAt, assigneeIds, attachments, description, startDate, status, tasks, title, dueDate, updatedAt, deletedAt, users } = project;
        return utils_1.default.removeUndefinedNullValuesFromObject({
            id: _id === null || _id === void 0 ? void 0 : _id.toString(),
            assigneeIds: assigneeIds === null || assigneeIds === void 0 ? void 0 : assigneeIds.map((assigneeId) => assigneeId === null || assigneeId === void 0 ? void 0 : assigneeId.toString()),
            assignees: users === null || users === void 0 ? void 0 : users.map(user_datasource_interface_1.default._mapDataToEntity),
            attachments: attachments === null || attachments === void 0 ? void 0 : attachments.map((_a) => {
                var { _id, createdAt, deletedAt } = _a, others = __rest(_a, ["_id", "createdAt", "deletedAt"]);
                return utils_1.default.removeUndefinedNullValuesFromObject(Object.assign(Object.assign({}, others), { id: _id === null || _id === void 0 ? void 0 : _id.toString(), dateDeleted: !!deletedAt ? new Date(deletedAt).toISOString() : undefined, dateAdded: !!createdAt ? new Date(createdAt).toISOString() : undefined }));
            }),
            description,
            status,
            tasks: tasks === null || tasks === void 0 ? void 0 : tasks.map((_a) => {
                var { _id, createdAt, deletedAt, updatedAt } = _a, others = __rest(_a, ["_id", "createdAt", "deletedAt", "updatedAt"]);
                return utils_1.default.removeUndefinedNullValuesFromObject(Object.assign(Object.assign({}, others), { id: _id === null || _id === void 0 ? void 0 : _id.toString(), dateDeleted: !!deletedAt ? new Date(deletedAt).toISOString() : undefined, dateAdded: !!createdAt ? new Date(createdAt).toISOString() : undefined, dateUpdated: !!updatedAt ? new Date(updatedAt).toISOString() : undefined }));
            }),
            title,
            startDate: !!startDate ? new Date(startDate).toISOString() : undefined,
            dueDate: !!dueDate ? new Date(dueDate).toISOString() : undefined,
            dateDeleted: !!deletedAt ? new Date(deletedAt).toISOString() : undefined,
            dateAdded: !!createdAt ? new Date(createdAt).toISOString() : undefined,
            dateUpdated: !!updatedAt ? new Date(updatedAt).toISOString() : undefined,
        });
    }
    static _mapEntityToData(project) {
        const { dateDeleted, assigneeIds, attachments, description, startDate, status, tasks, title, dueDate, dateAdded } = project;
        return utils_1.default.removeUndefinedNullValuesFromObject({
            assigneeIds: assigneeIds === null || assigneeIds === void 0 ? void 0 : assigneeIds.map((assigneeId) => new mongodb_1.ObjectId(assigneeId)),
            attachments: attachments === null || attachments === void 0 ? void 0 : attachments.map((_a) => {
                var { id, dateAdded, dateDeleted } = _a, others = __rest(_a, ["id", "dateAdded", "dateDeleted"]);
                return utils_1.default.removeUndefinedNullValuesFromObject(Object.assign(Object.assign({}, others), { _id: new mongodb_1.ObjectId(id !== null && id !== void 0 ? id : undefined), createdAt: (!!dateAdded ? new Date(dateAdded) : undefined), deletedAt: !!dateDeleted ? new Date(dateDeleted) : undefined }));
            }),
            description,
            status,
            tasks: tasks === null || tasks === void 0 ? void 0 : tasks.map((_a) => {
                var { id, dateAdded, dateUpdated, dateDeleted } = _a, others = __rest(_a, ["id", "dateAdded", "dateUpdated", "dateDeleted"]);
                return utils_1.default.removeUndefinedNullValuesFromObject(Object.assign(Object.assign({}, others), { _id: new mongodb_1.ObjectId(id !== null && id !== void 0 ? id : undefined), updatedAt: !!dateUpdated ? new Date(dateUpdated) : new Date(), createdAt: (!!dateAdded ? new Date(dateAdded) : undefined), deletedAt: !!dateDeleted ? new Date(dateDeleted) : undefined }));
            }),
            title,
            startDate: !!startDate ? new Date(startDate) : undefined,
            dueDate: !!dueDate ? new Date(dueDate) : undefined,
            updatedAt: new Date(),
            createdAt: (!!dateAdded ? new Date(dateAdded) : undefined),
            deletedAt: !!dateDeleted ? new Date(dateDeleted) : undefined,
        });
    }
}
exports.default = ProjectDataSourceInterface;
