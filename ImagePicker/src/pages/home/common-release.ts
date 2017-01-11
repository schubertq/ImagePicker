import {Component, Output} from '@angular/core';

import {ActionSheetController, LoadingController} from 'ionic-angular';
import {CameraOptions, Camera, ImagePickerOptions, ImagePicker} from "ionic-native/dist/es5/index";
import {EventEmitter} from "@angular/common/src/facade/async";

@Component({
  selector: 'common-release',
  templateUrl: 'common-release.html'
})
export class CommonReleaseCtrl {
  @Output() imagesSelected = new EventEmitter<any>();
  imagePaths: Array<string> = [];

  constructor(private actionsheetCtrl: ActionSheetController,
              private loadingCtrl: LoadingController) {
  }

  addImg() {
    if (this.imagePaths.length == 6) {
      let tipLoader = this.loadingCtrl.create({
        content: "最多添加6张!",
        spinner: 'hide',
        duration: 800,
        showBackdrop: true
      });
      tipLoader.present();
      return;
    }

    let actionSheet = this.actionsheetCtrl.create({
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: '拍照',
          handler: () => {
            this.takePhoto();
          }
        },
        {
          text: '从手机相册选择',
          handler: () => {
            this.pickImage();
          }
        },
        {
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  takePhoto(): void {
    let options: CameraOptions = {
      sourceType: Camera.PictureSourceType.CAMERA,
      destinationType: Camera.DestinationType.FILE_URI,
      correctOrientation: true,
      quality: 50,
      targetWidth: 720,
      encodingType: Camera.EncodingType.JPEG
    };
    Camera.getPicture(options).then((imageURI) => {
      this.imagePaths.push(imageURI);
      this.emitImagesData();
    }, (error) => {
      console.log(error);
    });
  }

  pickImage(): void {
    let options: ImagePickerOptions = {
      maximumImagesCount: 6,
      quality: 3
    };
    ImagePicker.getPictures(options).then((results) => {
      this.imagePaths = this.imagePaths.concat(results);
      this.emitImagesData();
    }, (error) => {
      console.log(error);
    });
  }

  // 发送更新图片数组
  emitImagesData() {
    this.imagesSelected.emit({
      value: this.imagePaths
    });
  }
}
