/**
 * 图片压缩工具类
 * 最大高度和最大宽度都为 500，如果超出大小将等比例缩放。
 *
 * 注意可能出现压缩后比原图更大的情况，在调用的地方自己判断大小并决定上传压缩前或压缩后的图到服务器。
 */

// 将base64转换为blob
export function convertBase64UrlToBlob(urlData) {
  let arr = urlData.split(',');
  let mime = arr[0].match(/:(.*?);/)[1];
  let bstr = atob(arr[1]);
  let n = bstr.length;
  let u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}

// 压缩图片
export function compressImage(path, imageSize = 500) {
  //最大高度
  let maxHeight = imageSize;
  //最大宽度
  let maxWidth = imageSize;

  return new Promise(resolve => {
    let img = new Image();
    img.src = path;
    img.onload = function() {
      const originHeight = img.height;
      const originWidth = img.width;
      let compressedWidth = img.height;
      let compressedHeight = img.width;
      if (originWidth > maxWidth && originHeight > maxHeight) {
        // 更宽更高，
        if (originHeight / originWidth > maxHeight / maxWidth) {
          // 更加严重的高窄型，确定最大高，压缩宽度
          compressedHeight = maxHeight;
          compressedWidth = maxHeight * (originWidth / originHeight);
        } else {
          //更加严重的矮宽型, 确定最大宽，压缩高度
          compressedWidth = maxWidth;
          compressedHeight = maxWidth * (originHeight / originWidth);
        }
      } else if (originWidth > maxWidth && originHeight <= maxHeight) {
        // 更宽，但比较矮，以maxWidth作为基准
        compressedWidth = maxWidth;
        compressedHeight = maxWidth * (originHeight / originWidth);
      } else if (originWidth <= maxWidth && originHeight > maxHeight) {
        // 比较窄，但很高，取maxHight为基准
        compressedHeight = maxHeight;
        compressedWidth = maxHeight * (originWidth / originHeight);
      } else {
        // 符合宽高限制，不做压缩
      }
      // 生成canvas
      let canvas = document.createElement('canvas');
      let context = canvas.getContext('2d');
      canvas.height = compressedHeight;
      canvas.width = compressedWidth;
      context.clearRect(0, 0, compressedWidth, compressedHeight);
      context.drawImage(img, 0, 0, compressedWidth, compressedHeight);
      let base64 = canvas.toDataURL('image/*', 0.8);
      let blob = convertBase64UrlToBlob(base64);
      // 回调函数返回blob的值。也可根据自己的需求返回base64的值
      resolve(blob);
    };
  });
}
