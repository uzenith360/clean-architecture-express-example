import { Request, Response, Router } from 'express';
import httpMethods from '../../../../utils/http-methods.enum';
import validateAndTransformSchema from '../../../../utils/validate-and-transform-schema';
import schema from './schema';
import getRouterMethod from '../../../../utils/get-router-method';
import RemoveProjectAttachmentUsecaseInterface from '../../../../domain/interfaces/usecases/project/remove-project-attachment.usecase.interface';

const removeProjectAttachmentHandler = async (
    path: string,
    method: httpMethods,
    removeProjectAttachmentUsecase: RemoveProjectAttachmentUsecaseInterface,
    router: Router,
): Promise<void> => {
    getRouterMethod(router, method)(
        path,
        validateAndTransformSchema(schema),
        async (req: Request, res: Response) => {
            try {
                const { id } = req.params;
                const { attachmentId } = req.body;

                const users = await removeProjectAttachmentUsecase.execute(id, attachmentId);

                res.send(users);
            } catch (err) {
                res.status(500).send({ message: "Error fetching data" });
            }
        }
    );
}

export default removeProjectAttachmentHandler;