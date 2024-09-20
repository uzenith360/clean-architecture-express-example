import ProjectStatsInterface from "../../project-stats.interface";

export default interface GetProjectsStatsUsecaseInterface {
    execute(): Promise<ProjectStatsInterface>;
}
