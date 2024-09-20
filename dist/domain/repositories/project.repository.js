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
Object.defineProperty(exports, "__esModule", { value: true });
class ProjectRepository {
    constructor(projectDatasource) {
        this.projectDatasource = projectDatasource;
    }
    getStat(startDate, endDate) {
        return __awaiter(this, void 0, void 0, function* () {
            const [overdue = 0, { completed = 0, inProgress: ongoing = 0, todo = 0 }] = yield Promise.all([
                this.projectDatasource.countOverdue(startDate, endDate),
                this.projectDatasource.getStats(startDate, endDate)
                    .then(stats => stats || { completed: 0, inProgress: 0, todo: 0 }),
            ]);
            return { overdue, completed, ongoing, total: completed + ongoing + todo };
        });
    }
    setTaskStatus(id, taskId, status) {
        return this.projectDatasource.setTaskStatus(id, taskId, status);
    }
    assignProject(id, assigneeId) {
        return this.projectDatasource.addAssigneeId(id, assigneeId);
    }
    unassignProject(id, assigneeId) {
        return this.projectDatasource.removeAssigneeId(id, assigneeId);
    }
    addAttachment(id, attachment) {
        return this.projectDatasource.addAttachment(id, attachment);
    }
    removeAttachment(id, attachmentId) {
        return this.projectDatasource.removeAttachment(id, attachmentId);
    }
    addTask(id, task) {
        return this.projectDatasource.addTask(id, task);
    }
    removeTask(id, taskId) {
        return this.projectDatasource.removeTask(id, taskId);
    }
    updateProject(id, project) {
        return this.projectDatasource.updateOne(id, project);
    }
    deleteProject(id) {
        return this.projectDatasource.updateOne(id, { dateDeleted: new Date().toISOString() });
    }
    getProject(id) {
        return this.projectDatasource.getOne(id);
    }
    getProjects(page, limit) {
        return this.projectDatasource.getAll(page, limit);
    }
    createProject(project) {
        return this.projectDatasource.createOne(Object.assign(Object.assign({}, project), { dateAdded: new Date().toISOString() }));
    }
}
exports.default = ProjectRepository;
