import express from 'express';
import CreateProjectUsecase from '../../../domain/interfaces/usecases/project/create-project.usecase.interface';
import GetAllProjectsUsecase from '../../../domain/interfaces/usecases/project/get-all-projects.usecase.interface';
import httpMethods from '../../../utils/http-methods.enum';
import AddProjectAssigneeUsecase from '../../../domain/usecases/project/add-project-assignee.usecase';
import AddProjectAttachmentUsecase from '../../../domain/usecases/project/add-project-attachment.usecase';
import GetProjectsStatsUsecase from '../../../domain/usecases/project/get-projects-stats.usecase';
import GetProjectsSummaryUsecase from '../../../domain/usecases/project/get-projects-summary.usecase';
import RemoveProjectAssigneeUsecase from '../../../domain/usecases/project/remove-project-assignee.usecase';
import RemoveProjectAttachmentUsecase from '../../../domain/usecases/project/remove-project-attachment.usecase';
import SetProjectStatusUsecase from '../../../domain/usecases/project/set-project-status.usecase';
import UpdateProjectDetailsUsecase from '../../../domain/usecases/project/update-project-details.usecase';
import DeleteProjectUsecase from '../../../domain/usecases/project/delete-project.usecase';
import GetProjectUsecase from '../../../domain/usecases/project/get-project.usecase';
import createProjectHandler from './create-project/handler';
import deleteProjectHandler from './delete-project/handler';
import getAllProjectsHandler from './get-all-projects/handler';
import getProjectHandler from './get-project/handler';
import addProjectAssigneeHandler from './add-project-assignee/handler';
import addProjectAttachmentHandler from './add-project-attachment/handler';
import getProjectsStatsHandler from './get-projects-stats/handler';
import getProjectsSummaryHandler from './get-projects-summary/handler';
import removeProjectAssigneeHandler from './remove-project-assignee/handler';
import removeProjectAttachmentHandler from './remove-project-attachment/handler';
import setProjectStatusHandler from './set-project-status/handler';
import updateProjectDetailsHandler from './update-project-details/handler';


export default function ProjectsRouter(
    addProjectAssigneeUsecase: AddProjectAssigneeUsecase,
    addProjectAttachmentUsecase: AddProjectAttachmentUsecase,
    createProjectUsecase: CreateProjectUsecase,
    deleteProjectUsecase: DeleteProjectUsecase,
    getAllProjectsUsecase: GetAllProjectsUsecase,
    getProjectUsecase: GetProjectUsecase,
    getProjectsStatsUsecase: GetProjectsStatsUsecase,
    getProjectsSummaryUsecase: GetProjectsSummaryUsecase,
    removeProjectAssigneeUsecase: RemoveProjectAssigneeUsecase,
    removeProjectAttachmentUsecase: RemoveProjectAttachmentUsecase,
    setProjectStatusUsecase: SetProjectStatusUsecase,
    updateProjectDetailsUsecase: UpdateProjectDetailsUsecase,
) {
    const router = express.Router();

    getProjectsStatsHandler('/stats', httpMethods.GET, getProjectsStatsUsecase, router);
    getProjectsSummaryHandler('/summary', httpMethods.GET, getProjectsSummaryUsecase, router);
    addProjectAssigneeHandler('/:id/assignee', httpMethods.POST, addProjectAssigneeUsecase, router);
    addProjectAttachmentHandler('/:id/attachment', httpMethods.POST, addProjectAttachmentUsecase, router);
    createProjectHandler('/', httpMethods.POST, createProjectUsecase, router);
    deleteProjectHandler('/:id', httpMethods.DELETE, deleteProjectUsecase, router);
    getAllProjectsHandler('/', httpMethods.GET, getAllProjectsUsecase, router);
    getProjectHandler('/:id', httpMethods.GET, getProjectUsecase, router);
    removeProjectAssigneeHandler('/:id/assignee', httpMethods.DELETE, removeProjectAssigneeUsecase, router);
    removeProjectAttachmentHandler('/:id/attachment', httpMethods.DELETE, removeProjectAttachmentUsecase, router);
    setProjectStatusHandler('/:id/status', httpMethods.PATCH, setProjectStatusUsecase, router);
    updateProjectDetailsHandler('/:id', httpMethods.PATCH, updateProjectDetailsUsecase, router);

    return router;
}
