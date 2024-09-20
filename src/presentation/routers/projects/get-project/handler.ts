import { Request, Response, Router } from 'express';
import httpMethods from '../../../../utils/http-methods.enum';
import validateAndTransformSchema from '../../../../utils/validate-and-transform-schema';
import schema from './schema';
import getRouterMethod from '../../../../utils/get-router-method';
import GetProjectUsecaseInterface from '../../../../domain/interfaces/usecases/project/get-project.usecase.interface';

const getProjectHandler = async (
    path: string,
    method: httpMethods,
    getProjectUsecase: GetProjectUsecaseInterface,
    router: Router,
): Promise<void> => {
    getRouterMethod(router, method)(
        path,
        validateAndTransformSchema(schema),
        async (req: Request, res: Response) => {
            try {
                const { id } = req.params;
                const project = await getProjectUsecase.execute(id);

                if(!!project){
                    res.send(project);
                } else {
                    res.status(404).send({ message: "Not found" });
                }
            } catch (err) {
                res.status(500).send({ message: "Error fetching data" });
            }
        }
    );
}

export default getProjectHandler;