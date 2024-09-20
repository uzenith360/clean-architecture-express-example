import NotificationEntity from "../../entities/notification.entity";
import NotificationRepositoryInterface from "../../interfaces/repositories/notification.repository.interface";
import GetAllNotificationsUsecaseInterface from "../../interfaces/usecases/notification/get-all-notifications.usecase.interface";

export default class GetAllNotificationsUsecase implements GetAllNotificationsUsecaseInterface {
    notificationRepository: NotificationRepositoryInterface
    constructor(notificationRepository: NotificationRepositoryInterface) {
        this.notificationRepository = notificationRepository
    }

    async execute(page: number, limit: number): Promise<NotificationEntity[]> {
        const result = await this.notificationRepository.getNotifications(page, limit);

        return result;
    }
}
