import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReadWriteRoutingModule } from './readwrite-routing.module';

import { ReadWriteComponent } from './readwrite.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ReadWriteComponent],
  imports: [CommonModule, SharedModule, ReadWriteRoutingModule]
})
export class ReadWriteModule {}
