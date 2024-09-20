
import ProjectDatasourceInterface from "../../data/interfaces/datasources/project.datasource.interface";
import ProjectEntity, { ProjectAttachmentEntity } from "../entities/project.entity";
import TaskEntity from "../entities/task.entity";
import UserEntity from "../entities/user.entity";
import ProjectStatsInterface from "../interfaces/project-stats.interface";
import ProjectRepositoryInterface from "../interfaces/repositories/project.repository.interface";
import taskStatus from "../task-status.enum";

export default class ProjectRepository implements ProjectRepositoryInterface {
    projectDatasource: ProjectDatasourceInterface
    constructor(projectDatasource: ProjectDatasourceInterface) {
        this.projectDatasource = projectDatasource;
    }

    async getStat(startDate?: string, endDate?: string): Promise<ProjectStatsInterface> {
        const [overdue = 0, { completed = 0, inProgress: ongoing = 0, todo = 0 }] = await Promise.all(
            [
                this.projectDatasource.countOverdue(startDate, endDate),
                this.projectDatasource.getStats(startDate, endDate)
                    .then(stats => stats || { completed: 0, inProgress: 0, todo: 0 }),
            ]
        );

        return { overdue, completed, ongoing, total: completed + ongoing + todo };
    }

    setTaskStatus(id: string, taskId: string, status: taskStatus): Promise<boolean> {
        return this.projectDatasource.setTaskStatus(id, taskId, status);
    }

    assignProject(id: string, assigneeId: string): Promise<boolean> {
        return this.projectDatasource.addAssigneeId(id, assigneeId);
    }

    unassignProject(id: string, assigneeId: string): Promise<boolean> {
        return this.projectDatasource.removeAssigneeId(id, assigneeId);
    }

    addAttachment(id: string, attachment: ProjectAttachmentEntity): Promise<boolean> {
        return this.projectDatasource.addAttachment(id, attachment);
    }

    removeAttachment(id: string, attachmentId: string): Promise<boolean> {
        return this.projectDatasource.removeAttachment(id, attachmentId);
    }

    addTask(id: string, task: TaskEntity): Promise<boolean> {
        return this.projectDatasource.addTask(id, task);
    }

    removeTask(id: string, taskId: string): Promise<boolean> {
        return this.projectDatasource.removeTask(id, taskId)
    }

    updateProject(id: string, project: Partial<ProjectEntity>): Promise<boolean> {
        return this.projectDatasource.updateOne(id, project);
    }

    deleteProject(id: string): Promise<boolean> {
        return this.projectDatasource.updateOne(id, { dateDeleted: new Date().toISOString() });
    }

    getProject(id: string): Promise<(ProjectEntity & { assignees?: UserEntity[]; }) | null> {
        return this.projectDatasource.getOne(id);
    }

    getProjects(page: number, limit: number): Promise<(ProjectEntity & { assignees?: UserEntity[]; })[]> {
        return this.projectDatasource.getAll(page, limit);
    }

    createProject(project: ProjectEntity): Promise<boolean> {
        return this.projectDatasource.createOne({ ...project, dateAdded: new Date().toISOString() });
    }
}
