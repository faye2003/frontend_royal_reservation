import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Post } from './post.model';

@Injectable({ providedIn: 'root' })
export class PostService {

    apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) {}

    getPosts(page: number, limit: number, data: any): Observable<any> {
        let dataParams = {
            page: page,
            limit: limit,
            search: data.search ?? ''
        }
        console.log(data);
        let reqHeader = new HttpHeaders({ 'Content-Type': 'application/json'});
        let option = { headers: reqHeader, params: dataParams }
        console.log(this.apiUrl);
        return this.http.get<any>(this.apiUrl + '/api/posts/', option);
    }

    getPostsById(id: number): Observable<any> {
        return this.http.get<any>(this.apiUrl + '/api/posts/' + id + '/');
    }

    createPost(post: Post): Observable<any> { // CREATE
        return this.http.post<any>(this.apiUrl + '/api/posts/', post);
    }
      

    updatePost(id: number, post: Post): Observable<any> { // UPDATE
        return this.http.put<any>(this.apiUrl + '/api/posts/' + id + '/', post);
    }

    deletePost(id: number): Observable<any> { // DELETE
        // console.log(this.apiUrl);
        return this.http.delete<any>(this.apiUrl + '/api/posts/' + id + '/');
    }
      
    
}
