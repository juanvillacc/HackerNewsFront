import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { StoriesSearchUseCase } from './../../domain/usecases/story-search.usecase';
import { DataModule } from '../../data/story/data.module';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import { StoryModel } from '../../domain/models/story.model';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
    ReactiveFormsModule,
    DataModule,
    MatPaginatorModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
    displayedColumns: string[] = ['story-title', 'story-link'];
    dataSource: StoryModel[] = [];
    totalRecords:number = 0;
    pageSize:number = 10;
    pageIndex:number = 0;
    title: string = "";
    searchForm!: FormGroup;
    constructor(
    private _storiesSearchUseCase: StoriesSearchUseCase,
    ) {
      this.searchForm = new FormGroup({
        searchText: new FormControl('s')
      });
      this.search();
     }

  search() {
      const params = {
        title: this.searchForm.controls['searchText'].value,
        index: this.pageIndex,
        pageSize: this.pageSize,
      };
debugger
      this._storiesSearchUseCase.execute(params).subscribe(response => {
        this.dataSource = response.page;
        this.totalRecords = response.resultsCount;

        console.log(response.page);
      });
  }
}
