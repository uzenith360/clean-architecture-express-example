"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TaskRepository {
    constructor(taskDataSource) {
        this.taskDataSource = taskDataSource;
    }
    createTask(task) {
        return this.taskDataSource.createOne(Object.assign(Object.assign({}, task), { dateAdded: new Date().toISOString() }));
    }
    updateTask(id, task) {
        return this.taskDataSource.updateOne(id, task);
    }
    deleteTask(id) {
        return this.taskDataSource.updateOne(id, { dateDeleted: new Date().toISOString() });
    }
    getTask(id) {
        return this.taskDataSource.getOne(id);
    }
    getTasks(projectId) {
        return this.taskDataSource.getAll(projectId, 1, 1000000);
    }
}
exports.default = TaskRepository;
