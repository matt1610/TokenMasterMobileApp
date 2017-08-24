import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AssignDevicePage } from './assign-device';

@NgModule({
  declarations: [
    AssignDevicePage,
  ],
  imports: [
    IonicPageModule.forChild(AssignDevicePage),
  ],
  exports: [
    AssignDevicePage
  ]
})
export class AssignDevicePageModule {}
