import { Request, Response, Router } from 'express';
import httpMethods from '../../../../utils/http-methods.enum';
import validateAndTransformSchema from '../../../../utils/validate-and-transform-schema';
import schema from './schema';
import getRouterMethod from '../../../../utils/get-router-method';
import GetUserUsecaseInterface from '../../../../domain/interfaces/usecases/user/get-user.usecase.interface';

const getUserHandler = async (
    path: string,
    method: httpMethods,
    getUserUsecase: GetUserUsecaseInterface,
    router: Router,
): Promise<void> => {
    getRouterMethod(router, method)(
        path,
        validateAndTransformSchema(schema),
        async (req: Request, res: Response) => {
            try {
                const { id } = req.params;
                const user = await getUserUsecase.execute(id);

                if (!!user) {
                    res.send(user);
                } else {
                    res.status(404).send({ message: "Not found" });
                }
            } catch (err) {
                res.status(500).send({ message: "Error fetching data" });
            }
        }
    );
}

export default getUserHandler;