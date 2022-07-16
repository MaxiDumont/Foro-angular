import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from './services/user.service';
import { global } from './services/global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent implements OnInit, DoCheck {
  title = 'foro-angular';
  public identity: any;
  public token: any;
  public url:string;
  public search: string;

  constructor(public _userService: UserService, private _router: Router, private _route: ActivatedRoute){
    this.loadUser();
    this.url = global.url;
    this.search = '';
  }
  loadUser(){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit(): void {
    // console.log(this.identity);
    // console.log(this.token);
    
  }

  ngDoCheck(): void {
    this.loadUser()
    this.identity = this._userService.getIdentity();
  }

  logOut(){
    localStorage.clear();
    
    this.identity=null;
    this.token =null;
    //redireccion a la pagina principal
    this._router.navigate(['/inicio']);
  }

  searchTopic(search: string){
    if(search ==""){
    this._router.navigate(['/inicio']);
    }else{
    console.log(search);
    
    this._router.navigate(['/buscar/'+search]);
    }
  }

}

