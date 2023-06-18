export function getBase64(img:File, callback:Function) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

// export function dataURLtoFile(dataURL:string, filename:string) {
//   const arr = dataURL.split(',');
//   const expectedMimeTypes = ['image/jpeg', 'image/png']; 


//   const match = arr[0].match(/:(.*?);/);
//   if (!match) return null;

//   const mime = match[1];

//   if (!expectedMimeTypes.includes(mime) ) return null;

//   const bstr = atob(arr[1]);
//   let n = bstr.length;
//   const u8arr = new Uint8Array(n);

//   while (n--) {
//     u8arr[n] = bstr.charCodeAt(n);
//   }

//   return new File([u8arr], filename, { type: mime });
// }
