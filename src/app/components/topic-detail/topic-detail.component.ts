import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TopicService } from 'src/app/services/topic';

import { Topic } from 'src/app/models/topic';
import { UserService } from 'src/app/services/user.service';
import { commentService } from 'src/app/services/comment';
import { global } from 'src/app/services/global';

import { comments } from 'src/app/models/comment';


@Component({
  selector: 'app-topic-detail',
  templateUrl: './topic-detail.component.html',
  styleUrls: ['./topic-detail.component.css'],
  providers: [UserService, TopicService, commentService]
})
export class TopicDetailComponent implements OnInit {

  public topic: Topic;
  public identity = this._userService.getIdentity();
  public token = this._userService.getToken();
  public comment: comments;
  public status: string;
  public url: string;

  constructor( private _commentService:commentService ,private _route:ActivatedRoute, private _router: Router , private _userService: UserService , private _topicService: TopicService) {
    this.topic = new Topic('', '', '', '', '', '', this.identity._id, null);
    this.comment = new comments('', '', '', this.identity._id);
    this.status = '';
    this.url = global.url;
   }

  ngOnInit(): void {
    this.getTopic();
  }

  getTopic(){
    this._route.params.subscribe(params => {
      let id = params['id'];
      this._topicService.getTopic(id).subscribe(
        response => {
          if(!response.topic){
            this._router.navigate(['/panel']);
          }else{
            this.topic = response.topic;
            console.log(response.topic);
            
          }
        },
        error => {
          console.log(error);
        }
      );
    })
  }

  onSubmit(form:any){
    this._commentService.add(this.token, this.comment, this.topic._id).subscribe(
      response => {
        if(response.topic){
          this.topic = response.topic;
          this.getTopic();
          this.status = 'success';
          form.reset();
        }else{
          this.status = 'error';
        }
      },
      error => {
        this.status = 'error';
        console.log(error);
      }
    );
  }

  okeyComment(){
    this.status = '';
  }

  deleteComment(id:string){
    this._commentService.delete(this.token, this.topic._id, id).subscribe(
      response => {
        if(response.topic){
          this.topic = response.topic;
          this.getTopic();
        }else{
          
        }
      },
      error => {
        console.log(error);
      }
    );
  }

}
