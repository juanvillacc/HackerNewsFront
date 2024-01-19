import { Observable } from 'rxjs';
import { UseCase } from '../base/use-case';
import { StoryPagedResponse } from '../models/storyPagedResponse';
import { StoryRepository } from '../repositories/story.repository';
export class StoriesSearchUseCase implements UseCase<{title: string, index: number, pageSize: number}, StoryPagedResponse> {
    constructor(private storyRepository: StoryRepository) { }

    execute(
        params: {title: string, index: number, pageSize: number},
    ): Observable<StoryPagedResponse> {
        return this.storyRepository.search(params);
    }
}
