import { Request, Response, Router } from 'express';
import httpMethods from '../../../../utils/http-methods.enum';
import validateAndTransformSchema from '../../../../utils/validate-and-transform-schema';
import schema from './schema';
import getRouterMethod from '../../../../utils/get-router-method';
import SetProjectStatusUsecaseInterface from '../../../../domain/interfaces/usecases/project/set-project-status.usecase.interface';

const setProjectStatusHandler = async (
    path: string,
    method: httpMethods,
    setProjectStatusUsecase: SetProjectStatusUsecaseInterface,
    router: Router,
): Promise<void> => {
    getRouterMethod(router, method)(
        path,
        validateAndTransformSchema(schema),
        async (req: Request, res: Response) => {
            try {
                const { id } = req.params;
                const { status } = req.body;

                const users = await setProjectStatusUsecase.execute(id, status);

                res.send(users);
            } catch (err) {
                res.status(500).send({ message: "Error fetching data" });
            }
        }
    );
}

export default setProjectStatusHandler;