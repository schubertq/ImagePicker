import {Component} from '@angular/core';

import {UploadService} from "../../service/upload.service";
import {ImageParam} from "./image-param";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  imagePaths: Array<string> = [];
  statusContent: string = '';

  constructor(private uploadService: UploadService) {
  }

  imagesSelected(event) {
    this.imagePaths = event.value;
  }

  upload() {
    // 这里设置为你的后台上传图片所需的参数
    var uploadParams = new ImageParam();
    uploadParams.ftype = 'image';
    uploadParams.utype = 'goods';
    // 注入UploadService
    this.uploadService.uploadImages(uploadParams, this.imagePaths).subscribe((data) => {
      // 获得所有上传图片返回的uri之后，再做你想做的事情
      // 这里拿到的后台返回的imageUrls数组与之前图片的本地url的filePaths数组的顺序是一致的
      // 也就是说不管上传图片谁先请求成功，ForkJoinObservable内部会按照之前信号数组添加的顺序将后台返回的数据排好序放在imageUrls数组中,
      // 这点还是不错的
    }, error => {
      console.log('上传失败');
    });
  }
}
