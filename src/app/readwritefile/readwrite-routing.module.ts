import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from '@angular/router';
import { ReadWriteComponent } from './readwrite.component';

const routes : Routes = [
    {
        path        :'readwrite',
        component   : ReadWriteComponent
    }
];

@NgModule({
    declarations: [],
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ReadWriteRoutingModule {}