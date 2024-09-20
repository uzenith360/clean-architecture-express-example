import { Request, Response, Router } from 'express';
import httpMethods from '../../../../utils/http-methods.enum';
import validateAndTransformSchema from '../../../../utils/validate-and-transform-schema';
import schema from './schema';
import getRouterMethod from '../../../../utils/get-router-method';
import AddProjectAttachmentUsecaseInterface from '../../../../domain/interfaces/usecases/project/add-project-attachment.usecase.interface';

const addProjectAttachmentHandler = async (
    path: string,
    method: httpMethods,
    addProjectAttachmentUsecase: AddProjectAttachmentUsecaseInterface,
    router: Router,
): Promise<void> => {
    getRouterMethod(router, method)(
        path,
        validateAndTransformSchema(schema),
        async (req: Request, res: Response) => {
            try {
                const { id } = req.params;
                const { url } = req.body;

                const users = await addProjectAttachmentUsecase.execute(id, { url, dateAdded: new Date().toISOString() });

                res.send(users);
            } catch (err) {
                res.status(500).send({ message: "Error fetching data" });
            }
        }
    );
}

export default addProjectAttachmentHandler;