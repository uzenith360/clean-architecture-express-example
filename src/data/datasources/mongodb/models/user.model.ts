/**
 * This is how the database stores the dara
 */

import { ObjectId } from "mongodb";

export default interface UserModel {
    _id?: ObjectId;
    email: string;
    firstName: string;
    lastName?: string;
    department: string;
    designation: string;
    isAdmin: boolean;
    hash: string;
    lastActiveAt?: Date;
    createdAt: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}
