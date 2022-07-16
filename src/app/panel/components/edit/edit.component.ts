import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TopicService } from 'src/app/services/topic';

import { Topic } from 'src/app/models/topic';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit',
  templateUrl: '../add/add.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [UserService, TopicService]
})
export class EditComponent implements OnInit {
  public page_title: string;
  public topic: Topic;
  public token = localStorage.getItem('token');
  public identity = this._userService.getIdentity();
  public status : string;
  public edit: string;
 
  constructor(private _route:ActivatedRoute, private _router: Router, private _userService: UserService , private _topicService: TopicService) {
    this.page_title = 'Editar Tema';
    this.topic = new Topic('', '', '', '', '', '', this.identity._id, null);
    this.status="";
    this.edit="";
   
   }
  ngOnInit(): void {
    this.getTopic();
  }

  getTopic(){
    //el this._route.params.subscribe recoge los parametros de la url
    this._route.params.subscribe(params => {
      let id = params['id'];
      this._topicService.getTopic(id).subscribe(
        response => {
          if(!response.topic){
            this._router.navigate(['/panel']);
          }else{
            this.topic = response.topic;
          }
        },
        error => {
          console.log(error);
        }
      );

    });
  } 

  onSubmit(from:any){
    var id = this.topic._id;
    this._topicService.update(this.token, this.topic, id).subscribe(
      response => {
        if(response.topic){
          this.status = 'success';
          this.edit = 'success';
          this.topic = response.topic;
          
        }else{
          this.status = 'error';
          this.edit = 'error';
        }
      },
      error => {
        this.status = 'error';
        this.edit = 'error';
        console.log(<any>error);
      }
    );
  }

}
