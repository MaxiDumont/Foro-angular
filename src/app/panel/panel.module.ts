//modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PanelRoutingModule } from './panel-routing.module';
import { MomentModule } from 'angular2-moment';

//components
import { AddComponent } from "./components/add/add.component";
import { MainComponent } from "./components/main/main.component";
import { EditComponent } from "./components/edit/edit.component";
import { ListComponent } from "./components/list/list.component";

//servicios
import { UserService } from "../services/user.service";
import { IdentityGuard } from '../services/identity.guard';

//NGmodule
@NgModule({
    declarations: [
        AddComponent,
        MainComponent,
        EditComponent,
        ListComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        PanelRoutingModule,
        MomentModule
    ],
    exports: [
        AddComponent,
        MainComponent,
        EditComponent,
        ListComponent
    ],
    providers: [
        UserService,
        IdentityGuard
    ]
})

export class PanelModule {}