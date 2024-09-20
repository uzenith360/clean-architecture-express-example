import express from 'express';
import CreateUserUsecase from '../../../domain/interfaces/usecases/user/create-user.usecase.interface';
import GetAllUsersUsecase from '../../../domain/interfaces/usecases/user/get-all-users.usecase.interface';
import httpMethods from '../../../utils/http-methods.enum';
import getAllUsersHandler from './get-all-users/handler';
import createUserHandler from './create-user/handler';
import DeleteUserUsecase from '../../../domain/usecases/user/delete-user.usecase';
import GetUserUsecase from '../../../domain/usecases/user/get-user.usecase';
import UpdateUserPasswordUsecase from '../../../domain/usecases/user/update-user-password.usecase';
import UpdateUserProfileUsecase from '../../../domain/usecases/user/update-user-profile.usecase';
import deleteUserHandler from './delete-user/handler';
import getUserHandler from './get-user/handler';
import updateUserPasswordHandler from './update-user-password/handler';
import updateUserProfileHandler from './update-user-profile/handler';


export default function UsersRouter(
    getAllUsersUsecase: GetAllUsersUsecase,
    createUserUsecase: CreateUserUsecase,
    deleteUserUsecase: DeleteUserUsecase,
    getUserUsecase: GetUserUsecase,
    updateUserPasswordUsecase: UpdateUserPasswordUsecase,
    updateUserProfileUsecase: UpdateUserProfileUsecase,
) {
    const router = express.Router();

    getAllUsersHandler('/', httpMethods.GET, getAllUsersUsecase, router);
    createUserHandler('/', httpMethods.POST, createUserUsecase, router);
    deleteUserHandler('/:id', httpMethods.DELETE, deleteUserUsecase, router);
    getUserHandler('/:id', httpMethods.GET, getUserUsecase, router);
    updateUserPasswordHandler('/:id/password', httpMethods.PATCH, updateUserPasswordUsecase, router);
    updateUserProfileHandler('/:id/profile', httpMethods.PATCH, updateUserProfileUsecase, router);

    return router;
}
