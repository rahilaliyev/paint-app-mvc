/** @format */

export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  init() {
    this.view.listeningStartDrawing(this.startDraw.bind(this));
    this.view.listeningDrawing(this.drawing.bind(this));
    this.view.listeningStopDrawing(this.stopDraw.bind(this));
    this.view.listeningToolBar(this.choisingToolbar.bind(this));
    this.view.listeningChangeSize(this.changeSize.bind(this));
    this.view.listeningChangeColor(this.changeColor.bind(this));
    this.view.listeningChangeColorPicker(this.changeColorPicker.bind(this));
    this.view.listeningClearCanvas();
  }

  startDraw(e) {
    this.model.isDrawing = true;
    this.model.mouseX = e.offsetX;
    this.model.mouseY = e.offsetY;
    this.view.changeLineWith(this.model.brushWidth);
    this.model.snapshotValue = this.view.getSnapshot();
    if (this.model.isSelectedTool === "eraser") {
      this.model.colorValue = "white";
    }
    this.view.ctx.fillStyle = this.model.colorValue;
    this.view.ctx.strokeStyle = this.model.colorValue;
  }

  drawing(e) {
    if (!this.model.isDrawing) return;
    this.view.putSnapshot(this.model.snapshotValue);
    if (this.model.isSelectedTool === "brush" || this.model.isSelectedTool === "eraser") {
      this.view.ctx.lineTo(e.offsetX, e.offsetY);
      this.view.ctx.stroke();
    } else if (this.model.isSelectedTool === "rectangle") {
      this.view.drawRect(e, this.model.mouseX, this.model.mouseY);
    } else if (this.model.isSelectedTool === "circle") {
      this.view.drawCircle(e, this.model.mouseX, this.model.mouseY);
    } else {
      this.view.drawTriangle(e, this.model.mouseX, this.model.mouseY);
    }
  }

  stopDraw() {
    this.model.isDrawing = false;
  }

  choisingToolbar(e) {
    this.model.isSelectedTool = e.target.id;
  }

  changeSize(e) {
    this.model.brushWidthValue = e.target.value;
  }

  changeColor(e) {
    const backgroundColor = window.getComputedStyle(e.target).getPropertyValue("background-color");
    this.model.colorValue = backgroundColor;
  }

  changeColorPicker(e) {
    this.model.colorValue = e;
  }
}
