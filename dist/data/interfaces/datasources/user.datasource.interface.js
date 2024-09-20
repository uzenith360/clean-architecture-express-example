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
class UserDataSourceInterface {
    static _mapDataToEntity(user) {
        const { _id, firstName, lastName, createdAt, department, designation, email, hash, isAdmin, deletedAt, lastActiveAt, updatedAt } = user;
        return utils_1.default.removeUndefinedNullValuesFromObject({
            id: _id === null || _id === void 0 ? void 0 : _id.toString(),
            lastName,
            firstName,
            designation,
            department,
            hash,
            isAdmin,
            email,
            dateDeleted: !!deletedAt ? new Date(deletedAt).toISOString() : undefined,
            dateAdded: !!createdAt ? new Date(createdAt).toISOString() : undefined,
            dateLastActive: !!lastActiveAt ? new Date(lastActiveAt).toISOString() : undefined,
        });
    }
    static _mapEntityToData(user) {
        const { firstName, lastName, department, designation, email, hash, isAdmin, dateDeleted, dateLastActive, dateAdded } = user;
        return utils_1.default.removeUndefinedNullValuesFromObject({
            lastName,
            firstName,
            designation,
            department,
            email,
            hash,
            isAdmin: !!isAdmin,
            updatedAt: new Date(),
            createdAt: (!!dateAdded ? new Date(dateAdded) : undefined),
            deletedAt: !!dateDeleted ? new Date(dateDeleted) : undefined,
            lastActiveAt: !!dateLastActive ? new Date(dateLastActive) : undefined,
        });
    }
}
exports.default = UserDataSourceInterface;
