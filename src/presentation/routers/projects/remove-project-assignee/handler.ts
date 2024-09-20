import { Request, Response, Router } from 'express';
import httpMethods from '../../../../utils/http-methods.enum';
import validateAndTransformSchema from '../../../../utils/validate-and-transform-schema';
import schema from './schema';
import getRouterMethod from '../../../../utils/get-router-method';
import RemoveProjectAssigneeUsecaseInterface from '../../../../domain/interfaces/usecases/project/remove-project-assignee.usecase.interface';

const removeProjectAssigneeHandler = async (
    path: string,
    method: httpMethods,
    removeProjectAssigneeUsecase: RemoveProjectAssigneeUsecaseInterface,
    router: Router,
): Promise<void> => {
    getRouterMethod(router, method)(
        path,
        validateAndTransformSchema(schema),
        async (req: Request, res: Response) => {
            try {
                const { id } = req.params;
                const { assigneeId } = req.body;

                const users = await removeProjectAssigneeUsecase.execute(id, assigneeId);

                res.send(users);
            } catch (err) {
                res.status(500).send({ message: "Error fetching data" });
            }
        }
    );
}

export default removeProjectAssigneeHandler;