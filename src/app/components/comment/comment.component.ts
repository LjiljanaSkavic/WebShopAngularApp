import { Component, Input, OnInit } from '@angular/core';
import { Comment } from "../../models/Comment";
import { UserService } from "../../services/user.service";
import { User } from "../../models/User";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() comment: Comment;
  isMyComment = false;

  constructor(private _userService: UserService) {
  }

  ngOnInit(): void {
    const userString = this._userService.getLoggedUser();
    if (userString !== null) {
      const user: User = JSON.parse(userString);
      this.isMyComment = user.id === this.comment.user.id;
    }
  }


}
