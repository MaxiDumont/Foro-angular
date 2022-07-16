import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { global } from 'src/app/services/global';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [UserService]
})
export class UserEditComponent implements OnInit {

  public page_tittle: string;
  public user : User
  public status: string;
  public Errormessage :string;
  public token: any;
  public identity : any;
  public url:string;
  
  //para el maxi del futuro.. esta cosa que sube la imagen ademas 
  //hace una peticion a la base de datos y actualiza la imagen en la base
  afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.png,.gif,.jpeg",
    maxSize: 500,
    uploadAPI:  {
      url: global.url+'upload-avatar',
      headers: {
      "Authorization" : this._userService.getToken()
      },
      params: {
        'page': '1'
      },
      
      withCredentials: false,
    },
    theme: "attachPin",
    hideProgressBar: true,
    hideResetBtn: true,
    hideSelectBtn: false,
    fileNameIndex: true,
    autoUpload: false,
    replaceTexts: {
      selectFileBtn: 'Select Files',
      resetBtn: 'Reset',
      dragNDropBox: 'Drag N Drop',
      attachPinBtn: 'Sube tu imagen para tu perfil',
      afterUploadMsg_success: 'Successfully Uploaded !',
      afterUploadMsg_error: 'Upload Failed !',
      sizeLimit: 'Size Limit'
    }
};
  

  constructor(private _userService: UserService) {
    this.page_tittle="Editar Usuario";
    this.user = new User('','','','','','','ROLE_USER');
    this.status = "";
    this.Errormessage="";
    this.loadUser();
    this.user= this.identity
    this.url=global.url;
  
   }

   

  ngOnInit(): void {


  }

  loadUser(){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  onSubmit(form:any){
    this._userService.update(this.user).subscribe(
      response =>{
        if(!response.user){
          this.status="error";
        }else{
          this.status="success";
          localStorage.setItem('identity', JSON.stringify(this.user));
        }
      },
      error =>{
        this.status = "error";
        console.log(<any>error);
      }
    )
   
  }

  AvatarUpload(data:any){
    this.user.image=data.body.user.image;
    console.log(this.user.image);
    this.identity.image=this.user.image;
    localStorage.setItem('identity', JSON.stringify(this.identity));
    
  }


}
