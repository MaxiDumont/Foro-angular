import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TopicService } from 'src/app/services/topic';

import { Topic } from 'src/app/models/topic';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css'],
  providers: [ TopicService]
})
export class TopicsComponent implements OnInit {
  public page_title: string;
  public topics: Topic[];
  public totalPages: number;
  public page: number;
  public next_page: number;
  public prev_page: number;
  public number_pages: number[];
  public actual_page: number;




  constructor(private _route:ActivatedRoute, private _router: Router , private _topicService: TopicService) {
    this.page_title = 'Temas';
    this.topics = [];
    this.totalPages = 0;
    this.page = 1;
    this.next_page = 1;
    this.prev_page = 1;
    this.number_pages = [];
    this.actual_page = 1;

   
   }
  ngOnInit(): void {
    this._route.params.subscribe(params=>{
      let page = +params['page'];
      if(!page||page==null||page==undefined||page==0){
        page = 1;
        this.prev_page=1;
        this.next_page=2;
        this.actual_page=1;
      }else{
        this.actual_page=page;
      }
      this.getTopics(page);
    })
    
    
  }

  getTopics(page=1){
    this._topicService.getTopics(page).subscribe(
      response => {
        if(response.topics){
          this.topics = response.topics;
          
          //navegacion de paginas
          this.totalPages = response.totalPages;
          
          var number_pages= [];
          for(var i=1; i<=this.totalPages; i++){
            number_pages.push(i);
          }
          this.number_pages = number_pages;

          if(page >= 2){
            this.prev_page = page - 1;
          }else{
            this.prev_page = 1;
          }
          if(page < this.totalPages){
            this.next_page = page + 1;
          }else{
            this.next_page = this.totalPages;
          }
          

        }else{
          this._router.navigate(['/inicio']);
          console.log("no");
          
        }
      },
        error => {
          console.log(error);
        }
    );
  }


}
