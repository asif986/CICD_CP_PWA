import { APP_INITIALIZER, NgModule } from "@angular/core";
import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { MatDatepickerModule, MatNativeDateModule } from "@angular/material";
import { ServiceWorkerModule, SwUpdate } from "@angular/service-worker";

import { AmazingTimePickerModule } from "amazing-time-picker";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { BottomNavPageModule } from "./bottom-nav/bottom-nav.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";
import { Camera } from "@ionic-native/camera/ngx";
import { DatePipe } from "@angular/common";
import { DocumentViewer } from "@ionic-native/document-viewer/ngx";
// import {AppVersion} from '@ionic-native/app-version/ngx';
import { File } from "@ionic-native/file/ngx";
import { FileChooser } from "@ionic-native/file-chooser/ngx";
import { FileOpener } from "@ionic-native/file-opener/ngx";
import { FilePath } from "@ionic-native/file-path/ngx";
import { FileTransfer } from "@ionic-native/file-transfer/ngx";
import { HTTP } from "@ionic-native/http/ngx";
import { Helper } from "./services/Helper";
import { HttpClientModule } from "@angular/common/http";
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";
import { IonicStorageModule } from "@ionic/storage";
import { MobileAccessibility } from "@ionic-native/mobile-accessibility/ngx";
import { Network } from "@ionic-native/network/ngx";
import { PhotoViewer } from "@ionic-native/photo-viewer/ngx";
import { PopUpRaiseBillPageModule } from "./pop-up-raise-bill/pop-up-raise-bill.module";
import { PopupalertPageModule } from "./popupalert/popupalert.module";
import { Push } from "@ionic-native/push/ngx";
import { RouteReuseStrategy } from "@angular/router";
import { ShowLogsPageModule } from "./show-logs/show-logs.module";
import { SocialSharing } from "@ionic-native/social-sharing/ngx";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { UniqueDeviceID } from "@ionic-native/unique-device-id/ngx";
import { environment } from "../environments/environment";

export const checkForUpdates = (
  swUpdate: SwUpdate,
  helper: Helper
): (() => Promise<any>) => {
  return (): Promise<void> =>
    new Promise((resolve) => {
      swUpdate.checkForUpdate();

      swUpdate.available.subscribe(() => {
        //   showAppUpdateAlert();
        const header = "App Update Available";
        const message = "Choose OK to update";

        //alert('App Update Available');
        // Use MatDialog or ionicframework's AlertController or similar
        helper.presentAlert(header, message, "UPDATE", (cb) => {
          window.location.reload();
        });
        // window.location.reload();
      });

      resolve();
    });
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpClientModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    BrowserAnimationsModule,
    BottomNavPageModule,
    AmazingTimePickerModule,
    PopupalertPageModule,
    ShowLogsPageModule,
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production,
      registrationStrategy:'registerImmediately'
    }),
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Network,
    DatePipe,
    Push,
    Camera,
    UniqueDeviceID,
    FileTransfer,
    File,
    InAppBrowser,
    SocialSharing,
    PhotoViewer,
    FilePath,
    FileChooser,
    HTTP,
    FileOpener,
    DocumentViewer,
    MobileAccessibility,
    {
      provide: APP_INITIALIZER,
      useFactory: checkForUpdates,
      deps: [SwUpdate, Helper],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
