import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TopicService } from 'src/app/services/topic';

import { Topic } from 'src/app/models/topic';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
  providers: [UserService, TopicService]
})
export class AddComponent implements OnInit {
  public page_title: string;
  public topic: Topic;
  public token = localStorage.getItem('token');
  public identity = this._userService.getIdentity();
  public status : string;
  public edit: string;


  constructor(private _route:ActivatedRoute, private _router: Router, private _userService: UserService , private _topicService: TopicService) {
    this.page_title = 'Añadir nuevo tema';
    this.topic = new Topic('', '', '', '', '', '', this.identity._id, null);
    this.status="";
    this.edit ="";
   
   }



  ngOnInit(): void {
  }

  onSubmit(from:any){
    this._topicService.addTopic(this.token, this.topic).subscribe(
      response => {
        if(response.topic){
          this.status = 'success';
          this.topic = response.topic;
          
        }else{
          this.status="error";
        }
      },
      error => {
        this.status = 'error';
        console.log(error);
      }
    );
    

  }

}
