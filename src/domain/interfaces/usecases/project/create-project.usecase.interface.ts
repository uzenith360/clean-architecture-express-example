import ProjectEntity from "../../../entities/project.entity";

export default interface CreateProjectUsecaseInterface {
    execute(project: ProjectEntity): Promise<boolean>;
}
