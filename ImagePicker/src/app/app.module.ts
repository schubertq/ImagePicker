import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import {UploadService} from "../service/upload.service";
import {CommonReleaseCtrl} from "../pages/home/common-release";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CommonReleaseCtrl,
    TabsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CommonReleaseCtrl,
    TabsPage
  ],
  providers: [UploadService, {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
