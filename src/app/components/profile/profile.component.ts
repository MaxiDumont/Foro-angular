import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Topic } from 'src/app/models/topic';
import { TopicService } from 'src/app/services/topic';
import { global } from 'src/app/services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [UserService, TopicService]
})
export class ProfileComponent implements OnInit {
  public user: User;
  public topics: Topic[];
  public url: string;
  



  constructor(private _userService: UserService, private _topicService: TopicService, private _route: ActivatedRoute, private _router: Router) { 
    this.url = global.url;
    this.topics=[];
    this.user = new User('','','','','','','ROLE_USER');
    
  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      var userId = params['id'];
      this.getUser(userId)
      this.getTopics(userId);
    })

  }

  getUser(userId:string){
    this._userService.getUser(userId).subscribe(
      response => {
        if(response.user){
          this.user = response.user;
          console.log(this.user);
          
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  getTopics(userId:string){
    this._topicService.getTopicsByUser(userId).subscribe(
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

}
