import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StoriesSearchUseCase } from './../../domain/usecases/story-search.usecase';
import { DataModule } from '../../data/story/data.module';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import { StoryModel } from '../../domain/models/story.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    DataModule,
    MatPaginatorModule,
    MatTableModule,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
    displayedColumns: string[] = ['story-title', 'story-link'];
    dataSource: StoryModel[] = [];
    constructor(
    private _storiesSearchUseCase: StoriesSearchUseCase,
    ) {
      this.search();
     }

  search() {
      const params = {
        title: "t",
        index: 0,
        pageSize: 5,
      };

      this._storiesSearchUseCase.execute(params).subscribe(response => {
        this.dataSource = response.page;
        console.log(response.page);
      });
  }
}
