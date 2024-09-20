/**
 * This is how the database stores the dara
 */

import { ObjectId } from "mongodb";
import notificationType from "../../../../domain/notification-type.enum";

export default interface NotificationModel {
    _id?: ObjectId;
    type: notificationType;
    userId?: ObjectId;
    taskId?: ObjectId;
    projectId?: ObjectId;
    createdAt: Date;
    deletedAt?: Date;
}
