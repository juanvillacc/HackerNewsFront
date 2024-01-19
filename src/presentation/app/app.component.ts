import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import { StoriesSearchUseCase } from './../../domain/usecases/story-search.usecase';
import { DataModule } from '../../data/story/data.module';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';
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
    MatToolbarModule,
    MatMenuModule,
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
        searchText: new FormControl('')
      });
      this.search(0);
     }

  search(index:number){
    this.pageIndex = index;
    this.searchData();
  }

  openUrl(url:string){
    window.open(url,"_blank");
  }
  searchData() {

      const params = {
        title: this.searchForm.controls['searchText'].value,
        index: this.pageIndex,
        pageSize: this.pageSize,
      };
      this._storiesSearchUseCase.execute(params).subscribe(response => {
        this.dataSource = response.page;
        this.totalRecords = response.resultsCount;
      });
  }

  onPaginateChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.searchData();
  }
}
