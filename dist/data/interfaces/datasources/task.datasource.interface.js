"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = __importDefault(require("@uzenith360/utils"));
/**
 * Like database operations/operations directly on the data-source (database, file, memory, network etc)
 * Pass in the parameters, that will be interpreted to database specific parameters
 * Dont pass in database/data-source specific parameters here!!!
**/
// This serves as an interface, i wanted to get static methods but couldn't do that with typescript interface
class TaskDataSourceInterface {
    static _mapDataToEntity(task) {
        const { _id, createdAt, updatedAt /*, projectId*/, status, title, deletedAt } = task;
        return utils_1.default.removeUndefinedNullValuesFromObject({
            id: _id === null || _id === void 0 ? void 0 : _id.toString(),
            status,
            title,
            // projectId: projectId?.toString(),
            dateDeleted: !!deletedAt ? new Date(deletedAt).toISOString() : undefined,
            dateAdded: !!createdAt ? new Date(createdAt).toISOString() : undefined,
            lastModified: !!updatedAt ? new Date(updatedAt).toISOString() : undefined,
        });
    }
    static _mapEntityToData(task) {
        const { dateDeleted, status, title, dateAdded } = task;
        return utils_1.default.removeUndefinedNullValuesFromObject({
            title,
            status,
            updatedAt: new Date(),
            createdAt: (!!dateAdded ? new Date(dateAdded) : undefined),
            deletedAt: !!dateDeleted ? new Date(dateDeleted) : undefined,
        });
    }
    ;
}
exports.default = TaskDataSourceInterface;
