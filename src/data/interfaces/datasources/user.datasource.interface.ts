import Utils from "@uzenith360/utils";
import UserEntity from "../../../domain/entities/user.entity";
import UserModel from "../../datasources/mongodb/models/user.model";

/**
 * Like database operations/operations directly on the data-source (database, file, memory, network etc)
 * Pass in the parameters, that will be interpreted to database specific parameters
 * Dont pass in database/data-source specific parameters here!!!
**/

// This serves as an interface, i wanted to get static methods but couldn't do that with typescript interface
export default abstract class UserDataSourceInterface {
    abstract createOne(user: UserEntity): Promise<boolean>;
    abstract getAll(page: number, limit: number): Promise<UserEntity[]>;
    abstract getOne(id: string): Promise<UserEntity | null>;
    abstract updateOne(id: string, user: Partial<UserEntity>): Promise<boolean>;

    static _mapDataToEntity(user: UserModel): UserEntity {
        const { _id, firstName, lastName, createdAt, department, designation, email, hash, isAdmin, deletedAt, lastActiveAt, updatedAt } = user;

        return Utils.removeUndefinedNullValuesFromObject({
            id: _id?.toString(),
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
        }) as unknown as UserEntity;
    }

    static _mapEntityToData(user: UserEntity): UserModel {
        const { firstName, lastName, department, designation, email, hash, isAdmin, dateDeleted, dateLastActive, dateAdded } = user;

        return Utils.removeUndefinedNullValuesFromObject({
            lastName,
            firstName,
            designation,
            department,
            email,
            hash,
            isAdmin: !!isAdmin,
            updatedAt: new Date(),
            createdAt: (!!dateAdded ? new Date(dateAdded) : undefined)!,
            deletedAt: !!dateDeleted ? new Date(dateDeleted) : undefined,
            lastActiveAt: !!dateLastActive ? new Date(dateLastActive) : undefined,
        }) as unknown as UserModel;
    }
}