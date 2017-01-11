# ImagePicker
Ionic2+AngularJS2 图片选择component和多图上传

* 功能如下:
    * 1.选择照相机或者相册里的图片并且展示
    * 2.多张图片异步上传至服务器

* 依赖插件:
    * $ ionic plugin add https://github.com/Telerik-Verified-Plugins/ImagePicker
    * $ ionic plugin add cordova-plugin-camera

<img src="https://github.com/schubertq/ImagePicker/raw/master/ImagePicker/screenshots/1.PNG" width = "30%" />
<img src="https://github.com/schubertq/ImagePicker/raw/master/ImagePicker/screenshots/2.PNG" width = "30%" />

利用RxJS上传多张图片
```javascript
/***
   * 上传多张图片
   * @param params: 服务器上传图片api所需参数
   * @param filePaths: 通过拍照或者相册拿到的本地图片url数组
   * @returns {Observable}: 服务器返回的图片url
   */
  uploadImages(params: any, filePaths: Array<string>):Observable<any> {
    var options: FileUploadOptions = {
      fileKey: 'filedata',
      fileName: 'avatar.jpg',
      chunkedMode: false,
      mimeType : "image/jpeg",
      params: params
    };

    //每个图片上传任务创建一个信号
    var observables: Array<any> = [];
    for (var  i = 0; i < filePaths.length; ++i) {
      let filePath = filePaths[i];
      var observable = new Observable((sub:any) => {
        const fileTransfer = new Transfer();
        let url = '图片上传url';
        fileTransfer.upload(filePath, url, options)
          .then((data: FileUploadResult) => {
            if (200 === data.responseCode) {
              var response = JSON.parse(data.response);
              // 图片上传成功，后台会返回一个图片imageUrl字符串
              var imageUrl = response.data;
              // 将该url发送出来
              sub.next(imageUrl);
              sub.complete();
            } else {
              sub.error('上传图片失败!');
            }
          }, (error) => {
            sub.error(error);
          });
      });
      observables.push(observable);
    }

    return ForkJoinObservable.create(observables);
  }
```