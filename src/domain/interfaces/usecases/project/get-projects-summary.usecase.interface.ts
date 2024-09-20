import ProjectStatsInterface from "../../project-stats.interface";

export default interface GetProjectsSummaryUsecaseInterface {
    execute(startDate?: string, endDate?: string): Promise<ProjectStatsInterface>;
}
