import Utils from "@uzenith360/utils";
import NotificationEntity from "../../../domain/entities/notification.entity";
import NotificationModel from "../../datasources/mongodb/models/notification.model";

/**
 * Like database operations/operations directly on the data-source (database, file, memory, network etc)
 * Pass in the parameters, that will be interpreted to database specific parameters
 * Dont pass in database/data-source specific parameters here!!!
**/
// This serves as an interface, i wanted to get static methods but couldn't do that with typescript interface
export default abstract class NotificationDataSourceInterface {
    abstract createOne(notification: NotificationEntity): Promise<boolean>;
    abstract getAll(page: number, limit: number): Promise<NotificationEntity[]>;
    abstract getOne(id: string): Promise<NotificationEntity | null>;
    abstract updateOne(id: string, notification: Partial<NotificationEntity>): Promise<boolean>;

    static _mapDataToEntity(notification: NotificationModel): NotificationEntity {
        const { _id, createdAt, deletedAt, type, projectId, taskId, userId } = notification;

        return Utils.removeUndefinedNullValuesFromObject({
            id: _id?.toString(),
            projectId: projectId?.toString(),
            taskId: taskId?.toString(),
            userId: userId?.toString(),
            type,
            dateDeleted: !!deletedAt ? new Date(deletedAt).toISOString() : undefined,
            dateAdded: !!createdAt ? new Date(createdAt).toISOString() : undefined,
        }) as unknown as NotificationEntity;
    }

    static _mapEntityToData(notification: NotificationEntity): NotificationModel {
        const { dateDeleted, dateAdded, type } = notification;

        return Utils.removeUndefinedNullValuesFromObject({
            type,
            createdAt: (!!dateAdded ? new Date(dateAdded) : undefined)!,
            deletedAt: !!dateDeleted ? new Date(dateDeleted) : undefined,
        }) as unknown as NotificationModel;
    }
}