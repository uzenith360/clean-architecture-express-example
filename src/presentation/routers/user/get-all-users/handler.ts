import { Request, Response, Router } from 'express'
import GetAllUsersUsecaseInterface from '../../../../domain/interfaces/usecases/user/get-all-users.usecase.interface';
import httpMethods from '../../../../utils/http-methods.enum';
import validateAndTransformSchema from '../../../../utils/validate-and-transform-schema';
import schema from './schema';
import getRouterMethod from '../../../../utils/get-router-method';

const getAllUsersHandler = async (
    path: string,
    method: httpMethods,
    getAllUsersUsecase: GetAllUsersUsecaseInterface,
    router: Router,
): Promise<void> => {
    getRouterMethod(router, method)(
        path,
        validateAndTransformSchema(schema),
        async (req: Request, res: Response) => {
            try {
                const { page = 1, limit = 10 } = req.query;
                const users = await getAllUsersUsecase.execute(+page, +limit);

                res.send(users);
            } catch (err) {
                res.status(500).send({ message: "Error fetching data" });
            }
        }
    );
}

export default getAllUsersHandler;