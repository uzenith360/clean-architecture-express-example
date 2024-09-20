import { Request, Response, Router } from 'express'
import httpMethods from '../../../../utils/http-methods.enum';
import validateAndTransformSchema from '../../../../utils/validate-and-transform-schema';
import schema from './schema';
import getRouterMethod from '../../../../utils/get-router-method';
import DeleteUserUsecaseInterface from '../../../../domain/interfaces/usecases/user/delete-user.usecase.interface';

const deleteUserHandler = async (
    path: string,
    method: httpMethods,
    deleteUserUsecase: DeleteUserUsecaseInterface,
    router: Router,
): Promise<void> => {
    getRouterMethod(router, method)(
        path,
        validateAndTransformSchema(schema),
        async (req: Request, res: Response) => {
            try {
                await deleteUserUsecase.execute(req.params.id);
    
                res.statusCode = 200;
    
                res.json({ message: "Deleted" });
            } catch (err) {
                res.status(500).send({ message: "Error deleting data" });
            }
        }
    );
}

export default deleteUserHandler;