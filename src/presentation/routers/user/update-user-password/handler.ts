import { Request, Response, Router } from 'express';
import httpMethods from '../../../../utils/http-methods.enum';
import validateAndTransformSchema from '../../../../utils/validate-and-transform-schema';
import schema from './schema';
import getRouterMethod from '../../../../utils/get-router-method';
import UpdateUserPasswordUsecaseInterface from '../../../../domain/interfaces/usecases/user/update-user-password.usecase.interface';

const updateUserPasswordHandler = async (
    path: string,
    method: httpMethods,
    updateUserPasswordUsecase: UpdateUserPasswordUsecaseInterface,
    router: Router,
): Promise<void> => {
    getRouterMethod(router, method)(
        path,
        validateAndTransformSchema(schema),
        async (req: Request, res: Response) => {
            try {
                const { id } = req.params;
                const { oldPassword, newPassword } = req.body;
                const users = await updateUserPasswordUsecase.execute(id, oldPassword, newPassword);

                res.send(users);
            } catch (err) {
                res.status(500).send({ message: "Error fetching data" });
            }
        }
    );
}

export default updateUserPasswordHandler;