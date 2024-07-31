import JsBarcode from "jsbarcode";

function generateBarcode() {
  const value = (document.getElementById("barcode-input") as HTMLInputElement).value;
  const height = parseInt((document.getElementById("height") as HTMLInputElement).value);

  const ean13 = document.getElementById("ean13");
  JsBarcode(ean13, value, {
    format: "ean13",
    displayValue: true,
    fontSize: 20,
    text: value,
    flat: true,
    height,
  });

  const code128 = document.getElementById("code128");
  JsBarcode(code128, value, {
    format: "code128",
    displayValue: true,
    fontSize: 20,
    text: value,
    flat: true,
    height,
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("barcode-input") as HTMLInputElement;
  input.addEventListener("input", generateBarcode);
  input.addEventListener("change", generateBarcode);

  const heightInput = document.getElementById("height") as HTMLInputElement;
  heightInput.addEventListener("input", generateBarcode);
  heightInput.addEventListener("change", generateBarcode);

  const save = document.getElementById("save") as HTMLButtonElement;
  save.addEventListener("click", () => {
    const barel = document.getElementById("barcode");
    if (barel === null) return;

    const barcode = barel as unknown as SVGGraphicsElement;

    const svgData = new XMLSerializer().serializeToString(barcode);

    const canvas = document.createElement("canvas");
    canvas.width = barcode.getBBox().width;
    canvas.height = barcode.getBBox().height;

    const ctx = canvas.getContext("2d");
    if (ctx === null) return;

    const image = new Image();
    image.onload = function () {
      ctx.drawImage(image, 0, 0);
      var a = document.createElement("a");
      a.href = canvas.toDataURL("image/jpeg");
      a.setAttribute("download", "image.jpg");
      a.dispatchEvent(new MouseEvent("click"));
    };
    image.src =
      "data:image/svg+xml;charset=utf-8;base64," + btoa(unescape(encodeURIComponent(svgData)));
  });
});
