const CANVAS_W = 500;
const CANVAS_H = 500;

function readAsDataURL(file) {
  return new Promise((res) => {
    const fileReader = new FileReader();
    fileReader.onload = () => res(fileReader.result);
    fileReader.readAsDataURL(file);
  });
}
function drawImage(image, ctx) {
  const img = new Image();
  return new Promise((res) => {
    img.src = image;
    img.onload = () => res(ctx.drawImage(img, 0, 0, CANVAS_W, CANVAS_H));
  });
}
function putImageData(imageData, ctx) {
  return new Promise((res) => {
    res(ctx.putImageData(imageData, 0, 0));
  });
}

function invertFilter(imageBitMap) {
  return new Promise((res) => {
    const uint8Array = imageBitMap.data;
    for (let i = 0; i < uint8Array.length; i += 4) {
      uint8Array[i] = uint8Array[i] ^ 255;
      uint8Array[i + 1] = uint8Array[i + 1] ^ 255;
      uint8Array[i + 2] = uint8Array[i + 2] ^ 255;
    }
    res(imageBitMap);
  });
}
function grayScaleFilter(imageBitMap) {
  return new Promise((res) => {
    const uint8Array = imageBitMap.data;
    for (let i = 0; i < uint8Array.length; i += 4) {
      //https://en.wikipedia.org/wiki/Grayscale#Converting_color_to_grayscale
      const formulaAvg = 0.2126 * uint8Array[i] + 0.7152 * uint8Array[i + 1] + 0.0722 * uint8Array[i + 2];
      uint8Array[i] = formulaAvg;
      uint8Array[i + 1] = formulaAvg;
      uint8Array[i + 2] = formulaAvg;
    }
    res(imageBitMap);
  });
}

const draw = async (image) => {
  const canvas1 = document.getElementById("canvas1");
  const canvas2 = document.getElementById("canvas2");
  const invertBtn = document.getElementById("invert");
  const grayscaleBtn = document.getElementById("grayscale");

  canvas1.width = CANVAS_W;
  canvas1.height = CANVAS_W;
  canvas2.width = CANVAS_W;
  canvas2.height = CANVAS_H;

  const ctx1 = canvas1.getContext("2d");
  const ctx2 = canvas2.getContext("2d");

  invertBtn.addEventListener("click", async () => {
    const invertedBitMap = await invertFilter(ctx1.getImageData(0, 0, CANVAS_W, CANVAS_H));
    await putImageData(invertedBitMap, ctx2);
  });
  grayscaleBtn.addEventListener("click", async () => {
    const gsBitMap = await grayScaleFilter(ctx1.getImageData(0, 0, CANVAS_W, CANVAS_H));
    await putImageData(gsBitMap, ctx2);
  });

  await drawImage(image, ctx1);
};

function init() {
  const button = document.querySelector("#load_image");

  button.addEventListener("change", async (e) => {
    const file = e.target.files[0];
    const dataUrl = await readAsDataURL(file);
    draw(dataUrl);
  });
}

init();
