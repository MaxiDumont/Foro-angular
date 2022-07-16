import { localizedString } from '@angular/compiler/src/output/output_ast';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  public page_tittle: string;
  public user : User
  public status: string;
  public Errormessage :string;
  public token: any;
  public identity : any;

  constructor(private _userService: UserService, private _router:Router, private _route:ActivatedRoute) { 
    this.page_tittle= 'Identificate';
    this.user = new User('','','','','','','ROLE_USER');
    this.status = "";
    this.Errormessage="";
  }

  ngOnInit(): void {


  }


  onSubmit(form:any){
    this._userService.signup(this.user,"true").subscribe(
      response =>{
        //token
        if (response.status != "error") {
            this.status= 'success';
            this.token = response.token 
            // console.log(this.token);
            
            //objeto usuario identificado
            this._userService.signup(this.user,"false").subscribe(
                response =>{
                  
                  this.identity= response.user;
                  // console.log(this.identity); 

                  //persistir datos del usuario identificado
                  localStorage.setItem('token', this.token);
                  localStorage.setItem('identity', JSON.stringify(this.identity));

                  // redireccion a la pagina principal
                  this._router.navigate(['inicio'])
                  this.status= 'success'
                  
                  },
                error => {
                  this.status= 'error'
                  console.log(<any>error)
                  this.Errormessage= error.error.message;
                  }
                )
        }
      },
      error => {
        this.status= 'error'
        console.log(<any>error)
        this.Errormessage= error.error.message;
      }
    )
  }

}