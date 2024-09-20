"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ProjectsRouter;
const express_1 = __importDefault(require("express"));
const http_methods_enum_1 = __importDefault(require("../../../utils/http-methods.enum"));
const handler_1 = __importDefault(require("./create-project/handler"));
const handler_2 = __importDefault(require("./delete-project/handler"));
const handler_3 = __importDefault(require("./get-all-projects/handler"));
const handler_4 = __importDefault(require("./get-project/handler"));
const handler_5 = __importDefault(require("./add-project-assignee/handler"));
const handler_6 = __importDefault(require("./add-project-attachment/handler"));
const handler_7 = __importDefault(require("./get-projects-stats/handler"));
const handler_8 = __importDefault(require("./get-projects-summary/handler"));
const handler_9 = __importDefault(require("./remove-project-assignee/handler"));
const handler_10 = __importDefault(require("./remove-project-attachment/handler"));
const handler_11 = __importDefault(require("./set-project-status/handler"));
const handler_12 = __importDefault(require("./update-project-details/handler"));
function ProjectsRouter(addProjectAssigneeUsecase, addProjectAttachmentUsecase, createProjectUsecase, deleteProjectUsecase, getAllProjectsUsecase, getProjectUsecase, getProjectsStatsUsecase, getProjectsSummaryUsecase, removeProjectAssigneeUsecase, removeProjectAttachmentUsecase, setProjectStatusUsecase, updateProjectDetailsUsecase) {
    const router = express_1.default.Router();
    (0, handler_7.default)('/stats', http_methods_enum_1.default.GET, getProjectsStatsUsecase, router);
    (0, handler_8.default)('/summary', http_methods_enum_1.default.GET, getProjectsSummaryUsecase, router);
    (0, handler_5.default)('/:id/assignee', http_methods_enum_1.default.POST, addProjectAssigneeUsecase, router);
    (0, handler_6.default)('/:id/attachment', http_methods_enum_1.default.POST, addProjectAttachmentUsecase, router);
    (0, handler_1.default)('/', http_methods_enum_1.default.POST, createProjectUsecase, router);
    (0, handler_2.default)('/:id', http_methods_enum_1.default.DELETE, deleteProjectUsecase, router);
    (0, handler_3.default)('/', http_methods_enum_1.default.GET, getAllProjectsUsecase, router);
    (0, handler_4.default)('/:id', http_methods_enum_1.default.GET, getProjectUsecase, router);
    (0, handler_9.default)('/:id/assignee', http_methods_enum_1.default.DELETE, removeProjectAssigneeUsecase, router);
    (0, handler_10.default)('/:id/attachment', http_methods_enum_1.default.DELETE, removeProjectAttachmentUsecase, router);
    (0, handler_11.default)('/:id/status', http_methods_enum_1.default.PATCH, setProjectStatusUsecase, router);
    (0, handler_12.default)('/:id', http_methods_enum_1.default.PATCH, updateProjectDetailsUsecase, router);
    return router;
}
