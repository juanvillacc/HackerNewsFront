import { Observable } from 'rxjs';
import { StoryPagedResponse } from '../models/storyPagedResponse';
export abstract class StoryRepository {
    abstract search(params: {title: string, index: number, pageSize: number} ): Observable<StoryPagedResponse>;
}
