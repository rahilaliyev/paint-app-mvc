/** @format */

export default class Model {
  constructor() {
    this.drawing = false;
    this.brushWidth = 5;
    this.prevMouseX = null;
    this.prevMouseY = null;
    this.snapshot = null;
    this.selectedTool = "brush";
    this.selectedColor = "black";
  }

  get isDrawing() {
    return this.drawing;
  }

  set isDrawing(value) {
    this.drawing = value;
  }

  get isSelectedTool() {
    return this.selectedTool;
  }

  set isSelectedTool(value) {
    this.selectedTool = value;
  }

  get mouseX() {
    return this.prevMouseX;
  }

  get mouseY() {
    return this.prevMouseY;
  }

  set mouseX(value) {
    this.prevMouseX = value;
  }

  set mouseY(value) {
    this.prevMouseY = value;
  }

  get snapshotValue() {
    return this.snapshot;
  }

  set snapshotValue(value) {
    this.snapshot = value;
  }

  get brushWidthValue() {
    return this.brushWidth;
  }

  set brushWidthValue(value) {
    this.brushWidth = value;
  }

  get colorValue() {
    return this.selectedColor;
  }

  set colorValue(value) {
    this.selectedColor = value;
  }

  eraserChoosing() {
    return this.selectedTool === "eraser";
  }
}
