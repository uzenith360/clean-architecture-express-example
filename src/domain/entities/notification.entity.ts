import notificationType from "../notification-type.enum";

export default interface NotificationEntity {
    id?: string;
    type: notificationType;
    userId?: string;
    taskId?: string;
    projectId?: string;
    dateAdded: string;
    dateDeleted?: string;
}
