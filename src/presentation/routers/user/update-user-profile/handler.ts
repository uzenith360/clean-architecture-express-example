import { Request, Response, Router } from 'express';
import httpMethods from '../../../../utils/http-methods.enum';
import validateAndTransformSchema from '../../../../utils/validate-and-transform-schema';
import schema from './schema';
import getRouterMethod from '../../../../utils/get-router-method';
import UpdateUserProfileUsecaseInterface from '../../../../domain/interfaces/usecases/user/update-user-profile.usecase.interface';

const updateUserProfileHandler = async (
    path: string,
    method: httpMethods,
    updateUserProfileUsecase: UpdateUserProfileUsecaseInterface,
    router: Router,
): Promise<void> => {
    getRouterMethod(router, method)(
        path,
        validateAndTransformSchema(schema),
        async (req: Request, res: Response) => {
            try {
                const { id } = req.params;
                const users = await updateUserProfileUsecase.execute(id, req.body);

                res.send(users);
            } catch (err) {
                res.status(500).send({ message: "Error fetching data" });
            }
        }
    );
}

export default updateUserProfileHandler;