import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {
  public page_tittle: string;
  public user : User
  public status: string;
  public Errormessage :string;
 

  constructor(private _userService: UserService) { 
    this.page_tittle = 'registrate'
    this.user = new User('','','','','','','ROLE_USER');
    this.status = "";
    this.Errormessage="";
    
   
  }

  ngOnInit(): void {
    console.log(this._userService.test())
  }

  onSubmit(form:any){
    
    this._userService.register(this.user).subscribe(
      response =>{
        if(response.status == "success"){
          this.status= response.status;
          form.reset();
          console.log();
        }else{
          this.status = "error";
          this.Errormessage = response.message;
        }
      },
      error => {
        this.status= "error"
        this.Errormessage= error.message; 
      }
    )
    
    
  }

}