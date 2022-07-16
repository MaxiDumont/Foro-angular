import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../models/user";
import { global } from "./global";

@Injectable()
export class commentService{
    public url: string;
    public identity: any;
    public token: any;

    constructor(public _http: HttpClient){
        this.url = global.url
    }

    add(token:any, comment:any, topicId:string):Observable<any> {
        let params = JSON.stringify(comment);
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                        .set('Authorization', token);

        return this._http.post(this.url + 'comment/topic/'+topicId, params, { headers: headers });

    }

    delete(token:any, topicId:string, commentId:string):Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                        .set('Authorization', token);

        return this._http.delete(this.url + 'comment/'+topicId+'/'+commentId, { headers: headers });

    }

}