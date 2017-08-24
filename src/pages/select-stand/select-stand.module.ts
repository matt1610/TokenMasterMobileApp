import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectStandPage } from './select-stand';

@NgModule({
  declarations: [
    SelectStandPage,
  ],
  imports: [
    IonicPageModule.forChild(SelectStandPage),
  ],
  exports: [
    SelectStandPage
  ]
})
export class SelectStandPageModule {}
