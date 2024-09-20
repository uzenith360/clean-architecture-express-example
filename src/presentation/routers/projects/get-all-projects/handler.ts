import { Request, Response, Router } from 'express'
import GetAllProjectsUsecaseInterface from '../../../../domain/interfaces/usecases/project/get-all-projects.usecase.interface';
import httpMethods from '../../../../utils/http-methods.enum';
import validateAndTransformSchema from '../../../../utils/validate-and-transform-schema';
import schema from './schema';
import getRouterMethod from '../../../../utils/get-router-method';

const getAllProjectsHandler = async (
    path: string,
    method: httpMethods,
    getAllProjectsUsecase: GetAllProjectsUsecaseInterface,
    router: Router,
): Promise<void> => {
    getRouterMethod(router, method)(
        path,
        validateAndTransformSchema(schema),
        async (req: Request, res: Response) => {
            try {
                const { page = 1, limit = 10 } = req.query;
                const projects = await getAllProjectsUsecase.execute(+page, +limit);

                res.send(projects);
            } catch (err) {
                res.status(500).send({ message: "Error fetching data" });
            }
        }
    );
}

export default getAllProjectsHandler;