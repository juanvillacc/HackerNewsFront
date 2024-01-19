import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { StoryImplementationRepository } from './story-implementation.repository';
import { StoryPagedResponse } from './../../domain/models/storyPagedResponse';

describe('StoryImplementationRepository', () => {
  let repository: StoryImplementationRepository;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StoryImplementationRepository],
    });

    repository = TestBed.inject(StoryImplementationRepository);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(repository).toBeTruthy();
  });

  it('should call http.get with the correct URL', () => {
    // Arrange: Set up the input parameters and a mock response
    const params = { title: 'Test', index: 0, pageSize: 10 };
    const mockResponse: StoryPagedResponse = { page: [], resultsCount: 0, pageIndex:0, pageSize:0 };

    // Act: Call the search method
    repository.search(params).subscribe();

    // Assert: Check if http.get was called with the correct URL
    const req = httpTestingController.expectOne(`https://hnapi.azurewebsites.net/story/search?title=${params.title}&pageSize=${params.pageSize}&pageIndex=${params.index}`);
    expect(req.request.method).toEqual('GET');

    // Respond with the mock response
    req.flush(mockResponse);

    // Verify that there are no outstanding requests
    httpTestingController.verify();
  });

  // You can add more tests for error handling, edge cases, etc.
});
