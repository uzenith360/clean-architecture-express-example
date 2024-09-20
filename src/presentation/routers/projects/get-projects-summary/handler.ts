import { Request, Response, Router } from 'express'
import httpMethods from '../../../../utils/http-methods.enum';
import validateAndTransformSchema from '../../../../utils/validate-and-transform-schema';
import schema from './schema';
import getRouterMethod from '../../../../utils/get-router-method';
import GetProjectsSummaryUsecaseInterface from '../../../../domain/interfaces/usecases/project/get-projects-summary.usecase.interface';

const getProjectsSummaryHandler = async (
    path: string,
    method: httpMethods,
    getProjectsSummaryUsecaseInterface: GetProjectsSummaryUsecaseInterface,
    router: Router,
): Promise<void> => {
    getRouterMethod(router, method)(
        path,
        validateAndTransformSchema(schema),
        async (req: Request, res: Response) => {
            try {
                const projects = await getProjectsSummaryUsecaseInterface.execute();

                res.send(projects);
            } catch (err) {
                res.status(500).send({ message: "Error fetching data" });
            }
        }
    );
}

export default getProjectsSummaryHandler;