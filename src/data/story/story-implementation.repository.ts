import { StoryPagedResponse } from './../../domain/models/storyPagedResponse';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StoryRepository } from './../../domain/repositories/story.repository';

@Injectable({
    providedIn: 'root',
})
export class StoryImplementationRepository extends StoryRepository {
    override search(params: { title: string; index: number; pageSize: number; }): Observable<StoryPagedResponse> {
       return this.http.get<StoryPagedResponse>(`https://hnapi.azurewebsites.net/story/search?title=${params.title}&pageSize=${params.pageSize}&pageIndex=${params.index}`);
    }

    constructor(private http: HttpClient) {
        super();
    }

}
