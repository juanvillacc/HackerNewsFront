import { StoryModel } from '../models/story.model';
export interface StoryPagedResponse {
    resultsCount: number;
    pageSize: string;
    pageIndex: string;
    page: StoryModel[];
}
