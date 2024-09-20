"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const process_1 = require("process");
const server_1 = __importDefault(require("./server"));
const user_router_1 = __importDefault(require("./presentation/routers/user/user.router"));
const get_all_users_usecase_1 = __importDefault(require("./domain/usecases/user/get-all-users.usecase"));
const user_repository_1 = __importDefault(require("./domain/repositories/user.repository"));
const create_user_usecase_1 = __importDefault(require("./domain/usecases/user/create-user.usecase"));
const mongodb_user_datasource_1 = __importDefault(require("./data/datasources/mongodb/mongodb-user.datasource"));
const mongodb_database_1 = __importDefault(require("./data/datasources/mongodb/mongodb-database"));
const delete_user_usecase_1 = __importDefault(require("./domain/usecases/user/delete-user.usecase"));
const get_user_usecase_1 = __importDefault(require("./domain/usecases/user/get-user.usecase"));
const update_user_password_usecase_1 = __importDefault(require("./domain/usecases/user/update-user-password.usecase"));
const update_user_profile_usecase_1 = __importDefault(require("./domain/usecases/user/update-user-profile.usecase"));
const project_repository_1 = __importDefault(require("./domain/repositories/project.repository"));
const mongodb_project_datasource_1 = __importDefault(require("./data/datasources/mongodb/mongodb-project.datasource"));
const project_router_1 = __importDefault(require("./presentation/routers/projects/project.router"));
const notifications_router_1 = __importDefault(require("./presentation/routers/notifications/notifications.router"));
const notification_repository_1 = __importDefault(require("./domain/repositories/notification.repository"));
const mongodb_notification_datasource_1 = __importDefault(require("./data/datasources/mongodb/mongodb-notification.datasource"));
const add_project_assignee_usecase_1 = __importDefault(require("./domain/usecases/project/add-project-assignee.usecase"));
const add_project_attachment_usecase_1 = __importDefault(require("./domain/usecases/project/add-project-attachment.usecase"));
const create_project_usecase_1 = __importDefault(require("./domain/usecases/project/create-project.usecase"));
const delete_project_usecase_1 = __importDefault(require("./domain/usecases/project/delete-project.usecase"));
const get_all_projects_usecase_1 = __importDefault(require("./domain/usecases/project/get-all-projects.usecase"));
const get_project_usecase_1 = __importDefault(require("./domain/usecases/project/get-project.usecase"));
const get_projects_stats_usecase_1 = __importDefault(require("./domain/usecases/project/get-projects-stats.usecase"));
const get_projects_summary_usecase_1 = __importDefault(require("./domain/usecases/project/get-projects-summary.usecase"));
const remove_project_assignee_usecase_1 = __importDefault(require("./domain/usecases/project/remove-project-assignee.usecase"));
const remove_project_attachment_usecase_1 = __importDefault(require("./domain/usecases/project/remove-project-attachment.usecase"));
const set_project_status_usecase_1 = __importDefault(require("./domain/usecases/project/set-project-status.usecase"));
const update_project_details_usecase_1 = __importDefault(require("./domain/usecases/project/update-project-details.usecase"));
const get_all_notifications_1 = __importDefault(require("./domain/usecases/notification/get-all-notifications"));
const { DB_CONNECTION_STRING = '', DB_NAME = '', PORT = '', } = process_1.env;
(() => __awaiter(void 0, void 0, void 0, function* () {
    const userDatabase = new mongodb_database_1.default({
        connectionString: DB_CONNECTION_STRING,
        dbName: DB_NAME,
    }, "users");
    const db = yield userDatabase.connect();
    // new MongoDBDatabase(db, 'task');
    const userRepository = new user_repository_1.default(new mongodb_user_datasource_1.default(userDatabase));
    const userMiddleWare = (0, user_router_1.default)(new get_all_users_usecase_1.default(userRepository), new create_user_usecase_1.default(userRepository), new delete_user_usecase_1.default(userRepository), new get_user_usecase_1.default(userRepository), new update_user_password_usecase_1.default(userRepository), new update_user_profile_usecase_1.default(userRepository));
    const projectRepository = new project_repository_1.default(new mongodb_project_datasource_1.default(new mongodb_database_1.default(db, 'projects')));
    const projectMiddleWare = (0, project_router_1.default)(new add_project_assignee_usecase_1.default(projectRepository), new add_project_attachment_usecase_1.default(projectRepository), new create_project_usecase_1.default(projectRepository), new delete_project_usecase_1.default(projectRepository), new get_all_projects_usecase_1.default(projectRepository), new get_project_usecase_1.default(projectRepository), new get_projects_stats_usecase_1.default(projectRepository), new get_projects_summary_usecase_1.default(projectRepository), new remove_project_assignee_usecase_1.default(projectRepository), new remove_project_attachment_usecase_1.default(projectRepository), new set_project_status_usecase_1.default(projectRepository), new update_project_details_usecase_1.default(projectRepository));
    const notificationRepository = new notification_repository_1.default(new mongodb_notification_datasource_1.default(new mongodb_database_1.default(db, 'notifications')));
    const notificationMiddleWare = (0, notifications_router_1.default)(new get_all_notifications_1.default(notificationRepository));
    server_1.default.use("/users", userMiddleWare);
    server_1.default.use("/projects", projectMiddleWare);
    server_1.default.use("/notifications", notificationMiddleWare);
    server_1.default.listen(+PORT, () => console.log("Running on server"));
}))();
