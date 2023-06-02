import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Comment } from "../models/Comment";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpClient: HttpClient) {
  }

  getCommentsByProductId(productId: number): Observable<Comment[]> {
    const getByProductId = `http://localhost:9000/comments/product/${ productId }`
    return this.httpClient.get<Comment[]>(getByProductId);
  }
}
