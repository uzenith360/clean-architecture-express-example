import { Request, Response, Router } from 'express'
import CreateUserUsecaseInterface from '../../../../domain/interfaces/usecases/user/create-user.usecase.interface';
import httpMethods from '../../../../utils/http-methods.enum';
import validateAndTransformSchema from '../../../../utils/validate-and-transform-schema';
import schema from './schema';
import getRouterMethod from '../../../../utils/get-router-method';

const createUserHandler = async (
    path: string,
    method: httpMethods,
    createUserUsecase: CreateUserUsecaseInterface,
    router: Router,
): Promise<void> => {
    getRouterMethod(router, method)(
        path,
        validateAndTransformSchema(schema),
        async (req: Request, res: Response) => {
            try {
                await createUserUsecase.execute(req.body);
    
                res.statusCode = 201;
    
                res.json({ message: "Created" });
            } catch (err) {
                res.status(500).send({ message: "Error saving data" });
            }
        }
    );
}

export default createUserHandler;