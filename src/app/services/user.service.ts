import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../models/user";
import { global } from "./global";

@Injectable()
export class UserService{
    public url: string;
    public identity: any;
    public token: any;

    constructor(public _http: HttpClient){
        this.url = global.url
    }

    test(){
        return "hola mundo desde un servicio"
    }

    register(user:any): Observable<any>{
        //convertir el objeto a un json
        let params = JSON.stringify(user);
        //definir el header
        let headers = new HttpHeaders().set('Content-Type','application/json');
        //hacer peticion post
        return this._http.post(this.url+'register',params,{headers:headers});
    }

    signup(user:any, getToken:string): Observable<any>{
        if(getToken == "true"){
            user.gettoken = "true";
        }else{
            user.gettoken = "false";
        }
        
        let params = JSON.stringify(user);

        let headers = new HttpHeaders().set('Content-Type','application/json');

        return this._http.post(this.url+'login',params,{headers:headers});
        
    }

    update( user:any): Observable<any>{
        let params = JSON.stringify(user);
        let headers = new HttpHeaders().set('Content-Type','application/json')
                                       .set('Authorization',this.getToken());

        return this._http.put(this.url+'user/update',params,{headers:headers});

    }   

    getIdentity(){
        let identity = JSON.parse(localStorage.getItem('identity')|| "[]");
    
        if(identity && this.identity != "undefined"){
            this.identity = identity;
        }else{
            this.identity= null;
        }

        return this.identity;
    }
      
      getToken(){
        let token = localStorage.getItem('token');
    
        if(token && this.token != "undefined"){
            this.token = token;
        }else{
            this.token= null;
        }

        return this.token;
    }

    getUsers(): Observable<any>{
        return this._http.get(this.url+'users');
    }

    getUser(userid:String): Observable<any>{
        return this._http.get(this.url+'user/'+userid);
    }
}
    
