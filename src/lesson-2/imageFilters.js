function readAsArrayBuffer(file) {
  return new Promise((res) => {
    const fileReader = new FileReader();
    fileReader.onload = () => res(fileReader.result);
    fileReader.readAsArrayBuffer(file);
  });
}
function makeBlob(arrayBuffer) {
  return new Promise((res) => {
    const uint8 = arrayBuffer.Uint8Array;

    //Invert image
    for (let i = 0; i < uint8.length; i += 4) {
      uint8[i] = 255 - uint8[i];
      uint8[i + 1] = uint8[i + 1] ^ 255;
      uint8[i + 2] = uint8[i + 2] ^ 255;
    }
    const blob = new Blob([uint8.buffer], { type: "image/jpeg" });
    res(blob);
  });
}
function blobToBase64(blob) {
  return new Promise((res) => {
    const fileReader = new FileReader();
    fileReader.onload = () => res(fileReader.result);
    fileReader.readAsDataURL(blob);
  });
}

const draw = (image) => {
  const canvas1 = document.querySelector("#canvas1");
  const ctx = canvas1.getContext("2d");
  const img = new Image();
  img.src = image;

  ctx.drawImage(img, 0, 0);
};

function init() {
  const button = document.querySelector("#load_image");
  const img = document.querySelector("#canvas1");
  button.addEventListener("change", async (e) => {
    const file = e.target.files[0];
    const buffer = await readAsArrayBuffer(file);
    const blob = await makeBlob(buffer);
    const base64 = await blobToBase64(blob);

    img.src = base64;
  });
}

init();
