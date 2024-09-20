import { Request, Response, Router } from 'express'
import CreateProjectUsecaseInterface from '../../../../domain/interfaces/usecases/project/create-project.usecase.interface';
import httpMethods from '../../../../utils/http-methods.enum';
import validateAndTransformSchema from '../../../../utils/validate-and-transform-schema';
import schema from './schema';
import getRouterMethod from '../../../../utils/get-router-method';
import projectStatus from '../../../../domain/project-status.enum';
import taskStatus from '../../../../domain/task-status.enum';

const createProjectHandler = async (
    path: string,
    method: httpMethods,
    createProjectUsecase: CreateProjectUsecaseInterface,
    router: Router,
): Promise<void> => {
    getRouterMethod(router, method)(
        path,
        validateAndTransformSchema(schema),
        async (req: Request, res: Response) => {
            try {
                const { status = projectStatus.todo, tasks, ...others } = req.body;
                await createProjectUsecase.execute(
                    {
                        ...others,
                        status,
                        dateAdded: new Date().toISOString(),
                        tasks: tasks.map(
                            (task: string) =>
                            (
                                {
                                    title: task,
                                    status: taskStatus.pending,
                                    dateAdded: new Date().toISOString(),
                                }
                            )
                        )
                    }
                );

                res.statusCode = 201;

                res.json({ message: "Created" });
            } catch (err) {
                res.status(500).send({ message: "Error saving data" });
            }
        }
    );
}

export default createProjectHandler;