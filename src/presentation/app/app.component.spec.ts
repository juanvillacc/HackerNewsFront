import { StoryPagedResponse } from './../../domain/models/storyPagedResponse';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { StoriesSearchUseCase } from './../../domain/usecases/story-search.usecase';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let storiesSearchUseCase: jasmine.SpyObj<StoriesSearchUseCase>;

  beforeEach(() => {
    // Create a spy object for the StoriesSearchUseCase
    storiesSearchUseCase = jasmine.createSpyObj('StoriesSearchUseCase', ['execute']);

    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        AppComponent,
        ReactiveFormsModule,
        FormsModule,
        MatTableModule,
        MatPaginatorModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: StoriesSearchUseCase, useValue: storiesSearchUseCase },
      ],
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    // Initialize form control with a default value for testing
    fixture.detectChanges();

  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should call _storiesSearchUseCase.execute() when search is invoked', async () => {
    // Arrange: Set up the spy to return a mock response
    const params = {
        title: '',
        index: component.pageIndex,
        pageSize: component.pageSize,
      }

    const mockResponse:StoryPagedResponse = {
      page: [
        { id:1, title: 'Story 1', link: 'Link 1' },
        { id:2,title: 'Story 2', link: 'Link 2' },
      ],
      resultsCount: 2,
      pageSize:10,
      pageIndex:0
    }

    storiesSearchUseCase.execute.and.returnValue(of(mockResponse));

    // Act: Call the search method
    component.search();
    fixture.detectChanges();




    // Assert: Check if the service method was called and the data was updated correctly
    //expect(storiesSearchUseCase.execute).toHaveBeenCalledOnceWith(params);

    expect(component.dataSource).toEqual(mockResponse.page);
    expect(component.totalRecords).toBe(2);
  });
});
