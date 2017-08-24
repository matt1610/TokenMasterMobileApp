import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScanDevicePage } from './scan-device';

@NgModule({
  declarations: [
    ScanDevicePage,
  ],
  imports: [
    IonicPageModule.forChild(ScanDevicePage),
  ],
  exports: [
    ScanDevicePage
  ]
})
export class ScanDevicePageModule {}
