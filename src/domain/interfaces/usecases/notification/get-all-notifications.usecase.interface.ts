import NotificationEntity from "../../../entities/notification.entity";

export default interface NotificationUsecaseInterface {
    execute(page: number, limit: number): Promise<NotificationEntity[]>;
}
