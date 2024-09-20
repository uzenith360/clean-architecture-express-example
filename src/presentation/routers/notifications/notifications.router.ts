import express from 'express';
import GetAllNotificationsUsecase from '../../../domain/interfaces/usecases/notification/get-all-notifications.usecase.interface';
import httpMethods from '../../../utils/http-methods.enum';
import getAllNotificationsHandler from './get-all-notifications/handler';


export default function NotificationsRouter(
    getAllNotificationsUsecase: GetAllNotificationsUsecase,
) {
    const router = express.Router();

    getAllNotificationsHandler('/', httpMethods.GET, getAllNotificationsUsecase, router);

    return router;
}
