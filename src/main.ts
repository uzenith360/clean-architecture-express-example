import { Db } from 'mongodb';
import { env } from 'process';
import server from './server';
import UserRouter from './presentation/routers/user/user.router';
import GetAllUsersUsecase from './domain/usecases/user/get-all-users.usecase';
import UserRepository from './domain/repositories/user.repository';
import CreateUserUsecase from './domain/usecases/user/create-user.usecase';
import MongoDBUserDatasource from './data/datasources/mongodb/mongodb-user.datasource';
import MongoDBDatabase from './data/datasources/mongodb/mongodb-database';
import DeleteUserUsecase from './domain/usecases/user/delete-user.usecase';
import GetUserUsecase from './domain/usecases/user/get-user.usecase';
import UpdateUserPasswordUsecase from './domain/usecases/user/update-user-password.usecase';
import UpdateUserProfileUsecase from './domain/usecases/user/update-user-profile.usecase';
import ProjectRepository from './domain/repositories/project.repository';
import MongoDBProjectDatasource from './data/datasources/mongodb/mongodb-project.datasource';
import ProjectsRouter from './presentation/routers/projects/project.router';
import NotificationsRouter from './presentation/routers/notifications/notifications.router';
import NotificationRepository from './domain/repositories/notification.repository';
import MongoDBNotificationDatasource from './data/datasources/mongodb/mongodb-notification.datasource';
import AddProjectAssigneeUsecase from './domain/usecases/project/add-project-assignee.usecase';
import AddProjectAttachmentUsecase from './domain/usecases/project/add-project-attachment.usecase';
import CreateProjectUsecase from './domain/usecases/project/create-project.usecase';
import DeleteProjectUsecase from './domain/usecases/project/delete-project.usecase';
import GetAllProjectsUsecase from './domain/usecases/project/get-all-projects.usecase';
import GetProjectUsecase from './domain/usecases/project/get-project.usecase';
import GetProjectsStatsUsecase from './domain/usecases/project/get-projects-stats.usecase';
import GetProjectsSummaryUsecase from './domain/usecases/project/get-projects-summary.usecase';
import RemoveProjectAssigneeUsecase from './domain/usecases/project/remove-project-assignee.usecase';
import RemoveProjectAttachmentUsecase from './domain/usecases/project/remove-project-attachment.usecase';
import SetProjectStatusUsecase from './domain/usecases/project/set-project-status.usecase';
import UpdateProjectDetailsUsecase from './domain/usecases/project/update-project-details.usecase';
import GetAllNotificationsUsecase from './domain/usecases/notification/get-all-notifications';

const {
    DB_CONNECTION_STRING = '',
    DB_NAME = '',
    PORT = '',
} = env;

(async () => {
    const userDatabase = new MongoDBDatabase(
        {
            connectionString: DB_CONNECTION_STRING,
            dbName: DB_NAME,
        },
        "users"
    );

    const db: Db = await userDatabase.connect();

    // new MongoDBDatabase(db, 'task');

    const userRepository: UserRepository = new UserRepository(new MongoDBUserDatasource(userDatabase));
    const userMiddleWare = UserRouter(
        new GetAllUsersUsecase(userRepository),
        new CreateUserUsecase(userRepository),
        new DeleteUserUsecase(userRepository),
        new GetUserUsecase(userRepository),
        new UpdateUserPasswordUsecase(userRepository),
        new UpdateUserProfileUsecase(userRepository),
    );

    const projectRepository: ProjectRepository = new ProjectRepository(new MongoDBProjectDatasource(new MongoDBDatabase(db, 'projects')));
    const projectMiddleWare = ProjectsRouter(
        new AddProjectAssigneeUsecase(projectRepository),
        new AddProjectAttachmentUsecase(projectRepository),
        new CreateProjectUsecase(projectRepository),
        new DeleteProjectUsecase(projectRepository),
        new GetAllProjectsUsecase(projectRepository),
        new GetProjectUsecase(projectRepository),
        new GetProjectsStatsUsecase(projectRepository),
        new GetProjectsSummaryUsecase(projectRepository),
        new RemoveProjectAssigneeUsecase(projectRepository),
        new RemoveProjectAttachmentUsecase(projectRepository),
        new SetProjectStatusUsecase(projectRepository),
        new UpdateProjectDetailsUsecase(projectRepository),
    );

    const notificationRepository: NotificationRepository = new NotificationRepository(new MongoDBNotificationDatasource(new MongoDBDatabase(db, 'notifications')));
    const notificationMiddleWare = NotificationsRouter(
        new GetAllNotificationsUsecase(notificationRepository),
    );

    server.use("/users", userMiddleWare);
    server.use("/projects", projectMiddleWare);
    server.use("/notifications", notificationMiddleWare);
    server.listen(+PORT, () => console.log("Running on server"));
})();
