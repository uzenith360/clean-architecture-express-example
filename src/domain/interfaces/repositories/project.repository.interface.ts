import ProjectEntity, { ProjectAttachmentEntity } from "../../entities/project.entity";
import TaskEntity from "../../entities/task.entity";
import UserEntity from "../../entities/user.entity";
import taskStatus from "../../task-status.enum";
import ProjectStatsInterface from "../project-stats.interface";

export default interface ProjectRespositoryInterface {
    createProject(project: ProjectEntity): Promise<boolean>;
    updateProject(id: string, project: Partial<ProjectEntity>): Promise<boolean>;
    deleteProject(id: string): Promise<boolean>;
    getStat(startDate?: string, endDate?: string): Promise<ProjectStatsInterface>;
    getProject(id: string): Promise<ProjectEntity & { assignees?: UserEntity[] } | null>;
    getProjects(page: number, limit: number): Promise<(ProjectEntity & { assignees?: UserEntity[] })[]>;
    assignProject(id: string, assigneeId: string): Promise<boolean>;
    unassignProject(id: string, assigneeId: string): Promise<boolean>;
    addAttachment(id: string, attachment: ProjectAttachmentEntity): Promise<boolean>;
    removeAttachment(id: string, attachmentId: string): Promise<boolean>;
    addTask(id: string, task: TaskEntity): Promise<boolean>;
    removeTask(id: string, taskId: string): Promise<boolean>;
    setTaskStatus(id: string, taskId: string, status: taskStatus): Promise<boolean>;
}
