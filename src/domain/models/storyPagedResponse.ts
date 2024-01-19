import { StoryModel } from '../models/story.model';
export interface StoryPagedResponse {
    resultsCount: number;
    pageSize: number;
    pageIndex: number;
    page: StoryModel[];
}
