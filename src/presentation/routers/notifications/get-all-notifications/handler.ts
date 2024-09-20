import { Request, Response, Router } from 'express'
import GetAllNotificationsUsecaseInterface from '../../../../domain/interfaces/usecases/notification/get-all-notifications.usecase.interface';
import httpMethods from '../../../../utils/http-methods.enum';
import validateAndTransformSchema from '../../../../utils/validate-and-transform-schema';
import schema from './schema';
import getRouterMethod from '../../../../utils/get-router-method';

const getAllNotificationsHandler = async (
    path: string,
    method: httpMethods,
    getAllNotificationsUsecase: GetAllNotificationsUsecaseInterface,
    router: Router,
): Promise<void> => {
    getRouterMethod(router, method)(
        path,
        validateAndTransformSchema(schema),
        async (req: Request, res: Response) => {
            try {
                const { page = 1, limit = 10 } = req.query;
                const notifications = await getAllNotificationsUsecase.execute(+page, +limit);

                res.send(notifications);
            } catch (err) {
                res.status(500).send({ message: "Error fetching data" });
            }
        }
    );
}

export default getAllNotificationsHandler;