"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NotificationRepository {
    constructor(notificationDataSource) {
        this.notificationDataSource = notificationDataSource;
    }
    updateNotification(id, notification) {
        return this.notificationDataSource.updateOne(id, notification);
    }
    deleteNotification(id) {
        return this.notificationDataSource.updateOne(id, { dateDeleted: new Date().toISOString() });
    }
    getNotification(id) {
        return this.notificationDataSource.getOne(id);
    }
    createNotification(notification) {
        return this.notificationDataSource.createOne(Object.assign(Object.assign({}, notification), { dateAdded: new Date().toISOString() }));
    }
    getNotifications(page, limit) {
        return this.notificationDataSource.getAll(page, limit);
    }
}
exports.default = NotificationRepository;
