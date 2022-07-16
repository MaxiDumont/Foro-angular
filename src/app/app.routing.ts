import { ModuleWithProviders} from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { HomeComponent } from "./components/home/home.component";
import { UserEditComponent } from "./components/user-edit/user-edit.component";
import { TopicsComponent } from "./components/topics/topics.component";
import { TopicDetailComponent } from "./components/topic-detail/topic-detail.component";
import { IdentityGuard } from "./services/identity.guard";
import { NoIdentityGuard } from "./services/no.identity.guard";
import { UsersComponent } from "./components/users/users.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { SearchComponent } from "./components/search/search.component";




const appRoutes: Routes=[
    {path: '', component: HomeComponent},
    {path: 'inicio', component: HomeComponent},
    {path: 'login',canActivate:[NoIdentityGuard], component: LoginComponent},
    {path: 'registro',canActivate:[NoIdentityGuard], component: RegisterComponent},
    {path: 'ajustes',  canActivate:[IdentityGuard] ,component: UserEditComponent},
    {path: 'temas', component: TopicsComponent},
    {path: 'temas/:page', component: TopicsComponent},
    {path: 'tema/:id', component: TopicDetailComponent},
    {path: 'usuarios', component: UsersComponent},
    {path: 'perfil/:id', component: ProfileComponent},
    {path: 'buscar/:search', component: SearchComponent},
    {path: '**', component: HomeComponent},
    
];

export const appRoutingProviders : any[]=[];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot (appRoutes) ;