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
class NotificationDataSourceInterface {
    static _mapDataToEntity(notification) {
        const { _id, createdAt, deletedAt, type, projectId, taskId, userId } = notification;
        return utils_1.default.removeUndefinedNullValuesFromObject({
            id: _id === null || _id === void 0 ? void 0 : _id.toString(),
            projectId: projectId === null || projectId === void 0 ? void 0 : projectId.toString(),
            taskId: taskId === null || taskId === void 0 ? void 0 : taskId.toString(),
            userId: userId === null || userId === void 0 ? void 0 : userId.toString(),
            type,
            dateDeleted: !!deletedAt ? new Date(deletedAt).toISOString() : undefined,
            dateAdded: !!createdAt ? new Date(createdAt).toISOString() : undefined,
        });
    }
    static _mapEntityToData(notification) {
        const { dateDeleted, dateAdded, type } = notification;
        return utils_1.default.removeUndefinedNullValuesFromObject({
            type,
            createdAt: (!!dateAdded ? new Date(dateAdded) : undefined),
            deletedAt: !!dateDeleted ? new Date(dateDeleted) : undefined,
        });
    }
}
exports.default = NotificationDataSourceInterface;
