
import NotificationDatasourceInterface from "../../data/interfaces/datasources/notification.datasource.interface";
import NotificationEntity from "../entities/notification.entity";
import NotificationRepositoryInterface from "../interfaces/repositories/notification.repository.interface";

export default class NotificationRepository implements NotificationRepositoryInterface {
    notificationDataSource: NotificationDatasourceInterface
    constructor(notificationDataSource: NotificationDatasourceInterface) {
        this.notificationDataSource = notificationDataSource;
    }

    updateNotification(id: string, notification: Partial<NotificationEntity>): Promise<boolean> {
        return this.notificationDataSource.updateOne(id, notification);
    }

    deleteNotification(id: string): Promise<boolean> {
        return this.notificationDataSource.updateOne(id, { dateDeleted: new Date().toISOString() });
    }

    getNotification(id: string): Promise<NotificationEntity | null> {
        return this.notificationDataSource.getOne(id);
    }

    createNotification(notification: NotificationEntity): Promise<boolean> {
        return this.notificationDataSource.createOne({ ...notification, dateAdded: new Date().toISOString() });
    }

    getNotifications(page: number, limit: number): Promise<NotificationEntity[]> {
        return this.notificationDataSource.getAll(page, limit);
    }
}
