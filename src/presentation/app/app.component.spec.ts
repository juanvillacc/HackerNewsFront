import { StoryPagedResponse } from './../../domain/models/storyPagedResponse';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { EMPTY, of } from 'rxjs';
import { AppComponent } from './app.component';
import { StoriesSearchUseCase } from './../../domain/usecases/story-search.usecase';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let storiesSearchUseCase: jasmine.SpyObj<StoriesSearchUseCase>;

  beforeEach(() => {
    // Create a spy object for the StoriesSearchUseCase
    //storiesSearchUseCase = jasmine.createSpyObj('StoriesSearchUseCase', ['execute']);

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
        { provide: StoriesSearchUseCase, useValue: {execute: (params:any) => EMPTY}},
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
});
