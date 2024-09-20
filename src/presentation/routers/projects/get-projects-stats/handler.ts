import { Request, Response, Router } from 'express'
import httpMethods from '../../../../utils/http-methods.enum';
import validateAndTransformSchema from '../../../../utils/validate-and-transform-schema';
import schema from './schema';
import getRouterMethod from '../../../../utils/get-router-method';
import GetProjectsStatsUsecaseInterface from '../../../../domain/interfaces/usecases/project/get-projects-stats.usecase.interface';

const getProjectsStatsHandler = async (
    path: string,
    method: httpMethods,
    getProjectsStatsUsecaseInterface: GetProjectsStatsUsecaseInterface,
    router: Router,
): Promise<void> => {
    getRouterMethod(router, method)(
        path,
        validateAndTransformSchema(schema),
        async (req: Request, res: Response) => {
            try {
                const projects = await getProjectsStatsUsecaseInterface.execute();

                res.send(projects);
            } catch (err) {
                res.status(500).send({ message: "Error fetching data" });
            }
        }
    );
}

export default getProjectsStatsHandler;