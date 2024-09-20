import NotificationDatasourceInterface from "../../interfaces/datasources/notification.datasource.interface";
import DatabaseWrapperInterface from "../../interfaces/datasources/database-wrapper.interface";
import NotificationModel from "./models/notification.model";
import NotificationEntity from "../../../domain/entities/notification.entity";
import Utils from "@uzenith360/utils";
import { ObjectId } from "mongodb";

export default class MongoDBNotificationDatasource extends NotificationDatasourceInterface {

    private database: DatabaseWrapperInterface
    constructor(database: DatabaseWrapperInterface) {
        super();

        this.database = database
    }

    async createOne(notification: NotificationEntity): Promise<boolean> {
        const result = await this.database.insertOne(MongoDBNotificationDatasource._mapEntityToData(notification));

        return result !== null;
    }

    async getAll(page: number, limit: number): Promise<NotificationEntity[]> {
        const { toSkip: skip } = Utils.getPaginationParameters(page, limit);

        const notifications = await this.database.find({ deletedAt: null }, { limit, skip });

        return notifications.map((notification) => MongoDBNotificationDatasource._mapDataToEntity(notification as NotificationModel));
    }

    async getOne(id: string): Promise<NotificationEntity | null> {
        const notification = await this.database.findOne({ _id: new ObjectId(id), deletedAt: null }) as NotificationModel | null;

        return notification && MongoDBNotificationDatasource._mapDataToEntity(notification);
    }

    async updateOne(id: string, notification: Partial<NotificationEntity>): Promise<boolean> {
        const result = await this.database.updateOne({ _id: new ObjectId(id) }, { $set: MongoDBNotificationDatasource._mapEntityToData(notification as NotificationEntity) });

        return result !== null;
    }
}
