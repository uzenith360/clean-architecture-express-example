import ProjectEntity from "../../../entities/project.entity";

export default interface UpdateProjectUsecaseInterface {
    execute(id: string, project: Partial<Omit<ProjectEntity, 'tasks' | 'dateAdded'>>): Promise<boolean>;
}
