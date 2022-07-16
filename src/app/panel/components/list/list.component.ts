import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TopicService } from 'src/app/services/topic';

import { Topic } from 'src/app/models/topic';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [UserService, TopicService]
})
export class ListComponent implements OnInit {
  public page_title: string;
  public topics: Array<Topic>;
  public token = localStorage.getItem('token');
  public identity = this._userService.getIdentity();
  public status : string;

  constructor(private _route:ActivatedRoute, private _router: Router, private _userService: UserService , private _topicService: TopicService) {
    this.page_title = 'Mis temas';
    this.topics = new Array<Topic>();
    this.status="";
   
   }

  ngOnInit(): void {
    this.getTopics();
  }

  getTopics(){
    this._topicService.getTopicsByUser(this.identity._id).subscribe(
      response => {
        if(response.topics){
          this.topics = response.topics;
          console.log(this.topics);
          
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteTopic(id:string){
    this._topicService.delete(this.token, id).subscribe(
      response => {
        this.getTopics();
      },
      error => {
        console.log(<any>error);
      }
    );

  }

}
