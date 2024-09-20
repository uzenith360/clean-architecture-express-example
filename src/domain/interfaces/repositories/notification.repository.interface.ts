import NotificationEntity from "../../entities/notification.entity";

export default interface NotificationRepositoryInterface {
    createNotification(notification: NotificationEntity): Promise<boolean>;
    updateNotification(id: string, notification: Partial<NotificationEntity>): Promise<boolean>;
    deleteNotification(id: string): Promise<boolean>;
    getNotification(id: string): Promise<NotificationEntity | null>;
    getNotifications(page: number, limit: number): Promise<NotificationEntity[]>;
}
