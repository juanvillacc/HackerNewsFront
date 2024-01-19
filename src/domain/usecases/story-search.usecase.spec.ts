import { StoriesSearchUseCase } from './../usecases/story-search.usecase';
import { StoryRepository } from '../repositories/story.repository';
import { Observable, of } from 'rxjs';
import { StoryPagedResponse } from '../models/storyPagedResponse';

describe('StoriesSearchUseCase', () => {
  let useCase: StoriesSearchUseCase;
  let storyRepository: jasmine.SpyObj<StoryRepository>;

  beforeEach(() => {
    storyRepository = jasmine.createSpyObj('StoryRepository', ['search']);

    useCase = new StoriesSearchUseCase(storyRepository);
  });

  it('should be created', () => {
    expect(useCase).toBeTruthy();
  });

  it('StoriesSearchUseCase should call storyRepository.search', () => {
    // Arrange: Set up the input parameters and a mock response
    const params = { title: 'Test', index: 0, pageSize: 10 };
    const mockResponse: StoryPagedResponse = { page: [], resultsCount: 0,pageSize: 10,pageIndex:0  };

    // Arrange: Configure the spy to return the mock response
    storyRepository.search.and.returnValue(of(mockResponse));

    // Act: Call the execute method
    const result = useCase.execute(params);

    // Assert: Check if storyRepository.search was called with the correct parameters
    expect(storyRepository.search).toHaveBeenCalledWith(params);

    // Assert: Check if the result is an Observable of the mock response
    result.subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });
  });

});
