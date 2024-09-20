import { Request, Response, Router } from 'express';
import httpMethods from '../../../../utils/http-methods.enum';
import validateAndTransformSchema from '../../../../utils/validate-and-transform-schema';
import schema from './schema';
import getRouterMethod from '../../../../utils/get-router-method';
import AddProjectAssigneeUsecaseInterface from '../../../../domain/interfaces/usecases/project/add-project-assignee.usecase.interface';

const addProjectAssigneeHandler = async (
    path: string,
    method: httpMethods,
    addProjectAssigneeUsecase: AddProjectAssigneeUsecaseInterface,
    router: Router,
): Promise<void> => {
    getRouterMethod(router, method)(
        path,
        validateAndTransformSchema(schema),
        async (req: Request, res: Response) => {
            try {
                const { id } = req.params;
                const { assigneeId } = req.body;

                const users = await addProjectAssigneeUsecase.execute(id, assigneeId);

                res.send(users);
            } catch (err) {
                res.status(500).send({ message: "Error fetching data" });
            }
        }
    );
}

export default addProjectAssigneeHandler;