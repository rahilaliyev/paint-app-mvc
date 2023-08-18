/** @format */

export default class View {
  constructor() {
    this.canvas = document.querySelector("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.toolBtns = document.querySelectorAll(".tool");
    this.activeOption = document.querySelector(".options .active");
    this.fillColor = document.querySelector("#fill-color");
    this.sizeSlider = document.querySelector("#size-slider");
    this.colorBtns = document.querySelectorAll(".colors .option");
    this.activeColorBtn = document.querySelector(".colors .selected");
    this.colorPicker = document.querySelector("#colored-picker");
    this.clearCanvas = document.querySelector(".clear-canvas");

    window.addEventListener("load", () => {
      this.canvas.width = this.canvas.offsetWidth;
      this.canvas.height = this.canvas.offsetHeight;
    });
  }

  changeLineWith(value) {
    this.ctx.lineWidth = value;
  }

  getSnapshot() {
    return this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
  }

  putSnapshot(snap) {
    this.ctx.putImageData(snap, 0, 0);
  }

  drawRect(e, prevMouseX, prevMouseY) {
    this.fillColor.checked
      ? this.ctx.fillRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY)
      : this.ctx.strokeRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY);
  }

  drawCircle(e, prevMouseX, prevMouseY) {
    this.ctx.beginPath();
    let radius = Math.sqrt(Math.pow(prevMouseX - e.offsetX, 2) + Math.pow(prevMouseY - e.offsetY, 2));
    this.ctx.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI);
    this.fillColor.checked ? this.ctx.fill() : this.ctx.stroke();
  }

  drawTriangle(e, prevMouseX, prevMouseY) {
    this.ctx.beginPath();
    this.ctx.moveTo(prevMouseX, prevMouseY);
    this.ctx.lineTo(e.offsetX, e.offsetY);
    this.ctx.lineTo(prevMouseX * 2 - e.offsetX, e.offsetY);
    this.ctx.closePath();
    this.fillColor.checked ? this.ctx.fill() : this.ctx.stroke();
  }
  listeningStartDrawing(callback) {
    this.canvas.addEventListener("mousedown", e => {
      callback(e);
      this.ctx.beginPath();
    });
  }

  listeningDrawing(callback) {
    this.canvas.addEventListener("mousemove", callback);
  }

  listeningStopDrawing(callback) {
    this.canvas.addEventListener("mouseup", callback);
  }

  listeningToolBar(callback) {
    this.toolBtns.forEach(btn =>
      btn.addEventListener("click", e => {
        this.activeOption.classList.remove("active");
        btn.classList.add("active");
        this.activeOption = btn;
        callback(e);
      })
    );
  }

  listeningChangeSize(callback) {
    this.sizeSlider.addEventListener("change", e => callback(e));
  }

  listeningChangeColor(callback) {
    this.colorBtns.forEach(color =>
      color.addEventListener("click", e => {
        this.activeColorBtn.classList.remove("selected");
        color.classList.add("selected");
        this.activeColorBtn = color;
        callback(e);
      })
    );
  }

  listeningChangeColorPicker(callback) {
    this.colorPicker.addEventListener("change", () => {
      this.colorPicker.parentElement.style.background = this.colorPicker.value;
      this.colorPicker.parentElement.click();
      callback(this.colorPicker.value);
    });
  }

  listeningClearCanvas(callback) {
    this.clearCanvas.addEventListener("click", () =>
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    );
  }
}
