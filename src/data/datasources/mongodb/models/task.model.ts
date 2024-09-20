/**
 * This is how the database stores the dara
 */

import { ObjectId } from "mongodb";
import taskStatus from "../../../../domain/task-status.enum";

export default interface TaskModel {
    _id?: ObjectId;
    title: string;
    status: taskStatus;
    createdAt: string;
    deletedAt?: Date;
    updatedAt?: Date;
}
