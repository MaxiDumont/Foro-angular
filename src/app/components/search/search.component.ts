import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TopicService } from 'src/app/services/topic';

import { Topic } from 'src/app/models/topic';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [ TopicService]
})
export class SearchComponent implements OnInit {
  public page_title: string;
  public topics: Topic[];
  public search: any;
 

  constructor(private _route:ActivatedRoute, private _router: Router , private _topicService: TopicService) {
    this.page_title = '';
    this.topics = [];
    this.search = '';

   
   }

  ngOnInit(): void {
    this._route.params.subscribe(params=>{
      this.search = params['search'];
      this.page_title = 'Resultados de la búsqueda: '+this.search;
      this.getTopics(this.search);
      console.log(this.search);
      
    })
  }

  getTopics(search:any){
    this._topicService.search(search).subscribe(
      response => {
        if(response.topics){
          this.topics = response.topics;
        }
      },
      error => {
        console.log(<any>error);
      }
    )

  }
}
