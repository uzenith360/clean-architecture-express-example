import { Request, Response, Router } from 'express';
import httpMethods from '../../../../utils/http-methods.enum';
import validateAndTransformSchema from '../../../../utils/validate-and-transform-schema';
import schema from './schema';
import getRouterMethod from '../../../../utils/get-router-method';
import UpdateProjectDetailsUsecaseInterface from '../../../../domain/interfaces/usecases/project/update-project-details.usecase.interface';

const updateProjectDetailsHandler = async (
    path: string,
    method: httpMethods,
    updateProjectDetailsUsecase: UpdateProjectDetailsUsecaseInterface,
    router: Router,
): Promise<void> => {
    getRouterMethod(router, method)(
        path,
        validateAndTransformSchema(schema),
        async (req: Request, res: Response) => {
            try {
                const { id } = req.params;
                const users = await updateProjectDetailsUsecase.execute(id, req.body);

                res.send(users);
            } catch (err) {
                res.status(500).send({ message: "Error fetching data" });
            }
        }
    );
}

export default updateProjectDetailsHandler;