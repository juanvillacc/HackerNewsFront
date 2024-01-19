import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { StoryRepository } from './../../domain/repositories/story.repository';
import { StoriesSearchUseCase } from './../../domain/usecases/story-search.usecase';
import { StoryImplementationRepository } from './../../data/story/story-implementation.repository';

const storiesSearchUseCaseFactory =
(storyRepo: StoryRepository) => new StoriesSearchUseCase(storyRepo);

export const storiesSearchUseCaseProvider = {
    provide: StoriesSearchUseCase,
    useFactory: storiesSearchUseCaseFactory,
    deps: [StoryRepository],
};

@NgModule({
    providers: [
        storiesSearchUseCaseProvider,
        { provide: StoryRepository, useClass: StoryImplementationRepository },
    ],
    imports: [
        CommonModule,
        HttpClientModule,
    ],
})
export class DataModule { }
